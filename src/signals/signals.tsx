import { computed, effect, signal } from '@preact/signals-react';

import { base64UrlToUint8Array, getSocialConnections } from 'utils';
import { qrCodeEnabled } from './qrCode';

const { VITE_DEFAULT_SCREEN_PROMPT: DEFAULT_SCREEN_PROMPT, VITE_DEFAULT_SCREEN: DEFAULT_SCREEN } = import.meta.env;

let tx_data = (window as any).universal_login_transaction_data as UL.TransactionData;

effect(() => {
	console.group('=== SIGNALS: TX DATA ===');
	console.log(JSON.stringify(tx_data, null, 2));
	console.groupEnd();
});

export const isLoading = signal(false);
export const otherTxData = signal<Partial<UL.TransactionData>>({});
export const actions = signal<UL.TransactionAction>(tx_data.actions);
export const client = signal<UL.Client>(tx_data.client);
export const errors = signal(tx_data.errors || []);
export const fieldErrors = signal<UL.Error[]>([]);
export const lastUsedSocial = signal<string | null>(null);
export const links = signal(tx_data.links);
// export const prompt = signal(tx_data.value.prompt ?? DEFAULT_SCREEN_PROMPT);
export const prompt = signal(tx_data.prompt?.name ?? DEFAULT_SCREEN_PROMPT);
export const screen = signal(tx_data.screen?.name ?? DEFAULT_SCREEN);
export const enableGtap = signal(false);
export const txParams = signal<UL.SafeTransactionParams>(parseTxParams(tx_data?.unsafe_data?.transaction_params ?? {}));

export const state = signal(tx_data.state);
export const submitted_form_data = signal<UL.UnsafeTransactionData['submitted_form_data']>(
	tx_data.unsafe_data?.submitted_form_data ?? {}
);
export const passkey_config = signal<UL.PasskeysConfig | null>(tx_data?.passkey_config);

export const pwd = signal<string | null>(null);
export const username = signal<string | null>(submitted_form_data.value?.email ?? null);
export const isOmni = signal(false);

// Computed Signals
export const public_key = computed<PublicKeyCredentialCreationOptions | PublicKeyCredentialRequestOptions | null>(
	() => {
		if (!!passkey_config.value) {
			const publicKeyConfig = passkey_config.value?.publicKey;
			const publicKey: Partial<PublicKeyCredentialCreationOptions | PublicKeyCredentialRequestOptions> = {};

			if (publicKeyConfig) {
				if (publicKeyConfig?.challenge) {
					publicKey['challenge'] = base64UrlToUint8Array(publicKeyConfig.challenge);
				}
				if (screen.value === 'passkey-enrollment' && publicKeyConfig.user?.id) {
					return {
						...publicKey,
						user: { ...publicKeyConfig.user, id: base64UrlToUint8Array(publicKeyConfig.user.id) },
					} as PublicKeyCredentialCreationOptions;
				}

				return publicKey as PublicKeyCredentialCreationOptions;
			}
		}
		return null;
	}
);
export const promptErrors = computed(() => errors.value.filter((e) => !e.usedField));
export const socialConnections = computed(() => getSocialConnections(client.value.id));

export function updateTxData(data: UL.TransactionData) {
	tx_data = data;

	actions.value = data?.actions ?? actions.value;
	client.value = data?.client ?? client.value;
	errors.value = data.errors ?? errors.value;
	links.value = data.links ?? links.value;
	prompt.value = data.prompt?.name;
	screen.value = data.screen?.name;
	state.value = data.state;
	submitted_form_data.value = data.unsafe_data?.submitted_form_data ?? submitted_form_data.value;
	passkey_config.value = data?.passkey_config ?? passkey_config.value;
	txParams.value = parseTxParams(data?.unsafe_data?.transaction_params, txParams.value);
}

function parseTxParams(
	data: UL.BaseUnsafeTransactionData['transaction_params'] = {},
	params: UL.SafeTransactionParams = {}
) {
	for (const [_key, _value] of Object.entries(data)) {
		const key = _key.replace('ext-', '');
		let value: string | number | boolean = _value;

		if (typeof value === 'string') {
			if (value !== undefined && value !== null && value !== '') {
				value = value.trim();
			}

			if (value === 'true') {
				value = true;
			} else if (value === 'false') {
				value = false;
			}
		} else if (typeof value === 'number') {
			const float = parseFloat(value);

			if (!isNaN(float) && isFinite(float)) {
				value = float;
			}
		}

		if (typeof value === 'boolean') {
			if (key === 'gtap') {
				enableGtap.value = value;
			}
			if (key === 'qr') {
				qrCodeEnabled.value = value;
			}
		}

		params[key] = value;
	}

	return params;
}
