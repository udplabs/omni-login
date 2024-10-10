import { effect, signal } from '@preact/signals-react';

import { poller } from 'utils';
import { isLoading, txParams } from './signals';

export const deviceCodeResponse = signal<GetDeviceCodeResponse | undefined>(undefined);
/**
 * Time (in milliseconds) the poller should wait.
 * @default 9000
 */
export const deviceCodeTTL = signal(9000);
export const isQRCode = signal(false);
export const qrCodeEnabled = signal(false);

effect(() => {
	isQRCode.value = txParams.value?.flow === 'qr_code';
});

effect(() => {
	if (deviceCodeResponse.value?.expires_in) {
		deviceCodeTTL.value = deviceCodeResponse.value.expires_in * 1000;
	}
});

effect(() => {
	if (qrCodeEnabled.value && isQRCode.value) {
		if (!deviceCodeResponse.value) {
			isLoading.value = true;

			getDeviceCode({ client_id: 'QUxj7h9U7UYL0aCpNmHWhXW5JrDAzpjO', scope: 'openid profile email' });
		}

		if (isLoading.value && deviceCodeResponse.value?.verification_uri_complete) {
			isLoading.value = false;
		}
	} else {
		deviceCodeResponse.value = undefined;
	}
});

effect(() => {
	if (deviceCodeResponse.value?.device_code) {
		getDeviceTokens({
			deviceCode: deviceCodeResponse.value.device_code,
			interval: deviceCodeResponse.value?.interval,
			redirectUri: txParams.value.redirect,
		});
	}
});

async function getDeviceCode(options: GetDeviceCodeOptions) {
	const controller = new AbortController();

	async function validator(response: Response) {
		const body = (await response.json()) as GetDeviceCodeResponse | GetErrorResponse;

		if (!response.ok && 'error' in body) {
			return new Error(`${body?.error}: ${body?.error_description}`);
		}

		deviceCodeResponse.value = body as GetDeviceCodeResponse;

		return false;
	}

	async function fetchCode() {
		const url = `${window.location.origin}/oauth/device/code`;

		return await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({ ...options }),
			signal: controller.signal,
		});
	}

	try {
		const initial = await validator(await fetchCode());

		if (!(initial instanceof Error)) {
			return await poller<Response, GetDeviceCodeResponse>({
				fn: fetchCode,
				validator,
				interval: deviceCodeTTL,
				controller,
				skipInitial: true,
			});
		}
		console.log('now what?!');
	} catch (error: unknown) {
		console.error(error);
	}
}

async function getDeviceTokens({
	deviceCode: device_code,
	interval = 5,
	maxPollingTime,
	redirectUri,
}: GetDeviceTokensOptions) {
	const controller = new AbortController();

	const validator = async (response: Response) => {
		const body = (await response.json()) as GetErrorResponse | GetTokenSuccessResponse;

		if ('error' in body && response.status === 403) {
			if (body?.error !== 'authorization_pending') {
				return new Error(`${body?.error}: ${body.error_description}`);
			}

			return false;
		}

		return body as GetTokenSuccessResponse;
	};

	const fetcher = async () => {
		return await fetch(`${window.location.origin}/oauth/token`, {
			method: 'POST',
			body: new URLSearchParams({
				/* TODO: need params */
				device_code,
				grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
				client_id: 'QUxj7h9U7UYL0aCpNmHWhXW5JrDAzpjO',
			}),
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			signal: controller.signal,
		});
	};

	try {
		await poller<Response, GetTokenSuccessResponse>({
			fn: fetcher,
			validator,
			interval: signal(interval * 1000),
			maxInterval: maxPollingTime,
			controller,
		});

		if (redirectUri) {
			return window.location.assign(redirectUri + '?error=login_required');
		}

		console.log('now what?!');
	} catch (error: unknown) {
		if (redirectUri) {
			return window.location.assign(`${redirectUri}?error=${error instanceof Error ? error.message : 'access_denied'}`);
		}

		console.error(error);
	}
}
