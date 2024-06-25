import { QRCode as QRCodeLogo } from 'react-qrcode-logo';

import { Input, PromptForm } from 'components';
import { deviceCodeResponse } from 'signals';

export const LoginQR = () => {
	return (
		<PromptForm includeSocialConnections description='Scan the QR code to continue.'>
			<div className='qr-code'>
				<QRCodeLogo
					{...{
						value: deviceCodeResponse.value?.verification_uri_complete,
						size: 175,
						qrStyle: 'dots',
						eyeRadius: 4,
						eyeColor: '#635dff',
					}}
				/>
				<p>Verify this code on your device</p>
				<Input name='device-code' disabled value={deviceCodeResponse.value?.user_code} />
			</div>
		</PromptForm>
	);
};

// async function getDeviceTokens({
// 	deviceCode: device_code,
// 	interval,
// 	maxPollingTime = 900,
// 	redirectUri,
// }: GetDeviceTokensOptions) {
// 	const controller = new AbortController();

// 	const validator = async (response: Response) => {
// 		const body = (await response.json()) as GetTokenErrorResponse | GetTokenSuccessResponse;

// 		if ('error' in body && response.status === 403) {
// 			if (body?.error !== 'authorization_pending') {
// 				return new Error(`${body?.error}: ${body.error_description}`);
// 			}

// 			return false;
// 		}

// 		return body as GetTokenSuccessResponse;
// 	};

// 	const fetcher = async () => {
// 		const params = new URLSearchParams({
// 			/* TODO: need params */
// 			device_code,
// 			grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
// 		});

// 		return await fetch(`${window.location.origin}/oauth/token`, {
// 			method: 'POST',
// 			body: params,
// 			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
// 			signal: controller.signal,
// 		});
// 	};

// 	try {
// 		await poller<Response, GetTokenSuccessResponse>({
// 			fn: fetcher,
// 			validator,
// 			interval,
// 			maxInterval: maxPollingTime,
// 			controller,
// 		});

// 		if (redirectUri) {
// 			return window.location.assign(redirectUri);
// 		}

// 		console.log('now what?!');
// 	} catch (error: unknown) {
// 		if (redirectUri) {
// 			return window.location.assign(`${redirectUri}?error=${error instanceof Error ? error.message : 'access_denied'}`);
// 		}

// 		console.error(error);
// 	}
// }

// interface GetDeviceTokensOptions {
// 	deviceCode: string;
// 	/**
// 	 * Time in seconds to wait between polling.
// 	 */
// 	interval?: number;
// 	/**
// 	 * Max time (in seconds) to poll before cancelling.
// 	 */
// 	maxPollingTime?: number;
// 	redirectUri?: string;
// }

// interface GetTokenSuccessResponse {
// 	access_token: string;
// 	refresh_token: string;
// 	id_token: string;
// 	token_type: 'Bearer';
// 	expires_in: number;
// }
