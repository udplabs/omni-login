declare global {
	namespace UL {
		interface BaseTransactionData {
			captcha?: {
				enabled: boolean;
			};
			client: UL.Client;
			locale: string;
			organization: UL.Organization | null;
			prompt: UL.Prompt;
			screen: UL.Screen;
			tenant: UL.Tenant;
			unsafe_data: UL.BaseUnsafeTransactionData;
			state: string;
			errors: Error[];
		}

		interface BaseUnsafeTransactionData {
			transaction_params: {
				/* optional custom query params. */
				[key: string]: string;
			};
		}

		interface Client {
			id: string;
			name: string;

			// Unsure if this is actually in the 'spec'
			metadata?: Record<string, string>;
		}

		interface CountryCode {
			code: string;
			prefix: string;
		}

		interface Error {
			code: string;
			field: string;
			message: string;
			usedField?: boolean;
		}

		interface Organization {
			id: string;
			name: string;
		}

		interface Prompt<T extends UL.ScreenPrompt = 'login-id'> {
			name: T;
		}

		interface Screen<T extends UL.ScreenName = 'login-id'> {
			name: T;

			// Unsure if this is actually in the 'spec'
			texts?: Record<string, string>;
		}

		type ScreenName = Omit<UL.ScreenPrompt, 'passkeys'> | 'passkey-enrollment' | 'passkey-enrollment-local';

		type ScreenPrompt =
			| 'login'
			| 'login-id'
			| 'login-password'
			| 'signup'
			| 'signup-id'
			| 'signup-password'
			| 'passkeys';

		interface Tenant {
			name: string;
			friendly_name: string;

			// Unsure if these are actually in the 'spec'
			support_url?: string;
			support_email?: string;
		}

		interface TransactionData extends BaseTransactionData {
			prompt: UL.Prompt<'passkeys'>;
			screen: UL.Screen<'passkey-enrollment' | 'passkey-enrollment-local'>;
			passkey_config: UL.PasskeysConfig | null;
			// links: unknown;
			// unsafe_data: UL.UnsafeTransactionData;
		}
		interface TransactionData extends BaseTransactionData {
			prompt: UL.Prompt<'login-password'>;
			screen: UL.Screen<'login-password'>;
			links: UL.TransactionLinks.LoginPassword;
			unsafe_data: UL.UnsafeTransactionData;
		}
		interface TransactionData extends BaseTransactionData {
			prompt: UL.Prompt<'signup-password'>;
			screen: UL.Screen<'signup-password'>;
			actions: UL.TransactionActions<'back'>;
			links: UL.TransactionLinks.SignupPassword;
			unsafe_data: UL.UnsafeTransactionData;
		}
		interface TransactionData extends BaseTransactionData {
			prompt: UL.Prompt<'login-id'>;
			screen: UL.Screen<'login-id'>;
			actions: UL.TransactionActions<'pick_country_code'>;
			country_code: UL.CountryCode;
			links: UL.TransactionLinks.LoginId;
			unsafe_data: UL.UnsafeTransactionData;
		}
		interface TransactionData extends BaseTransactionData {
			prompt: UL.Prompt<'signup-id'>;
			screen: UL.Screen<'signup-id'>;
			actions: UL.TransactionActions<'pick_country_code'>;
			country_code: UL.CountryCode;
			links: UL.TransactionLinks.SignupId;
			unsafe_data: UL.UnsafeTransactionData;
		}

		interface PasskeysConfig extends Omit<CredentialCreationOptions | CredentialRequestOptions, 'publicKey'> {
			publicKey?: UL.PasskeysEnrollmentConfig;
		}

		interface PasskeysEnrollmentConfig
			extends Omit<PublicKeyCredentialRequestOptions | PublicKeyCredentialCreationOptions, 'challenge' | 'user'> {
			challenge: string;
			user: Omit<PublicKeyCredentialUserEntity, 'id'> & { id?: string };
		}

		type TransactionActions = 'pick_country_code' | 'back' | string;

		interface TransactionAction<T extends UL.TransactionActions = 'pick_country_code'> {
			[key: T]: T;
		}

		type TransactionLinkTypes = 'signup' | 'forgot_password' | 'edit_email' | 'login' | 'back';

		interface TransactionLinks {
			login: string;
		}
		interface TransactionLinks {
			login: string;
			edit_email: string;
		}
		interface TransactionLinks {
			signup: string;
			forgot_password: string;
		}
		interface TransactionLinks {
			signup: string;
			forgot_password: string;
			edit_email: string;
		}

		interface UnsafeTransactionData extends UL.BaseUnsafeTransactionData {
			submitted_form_data: {
				email?: string;
				phone_number?: string;
				username?: string;
				[key: string]: string;
			};
		}

		interface FormData {
			state?: string;
			email?: string;
			username?: string;
			password?: string;
			action?: 'default' | UL.TransactionActions;
			'js-available'?: string;
			'is-brave'?: string;
			'webauthn-available'?: string;
			'webauthn-platform-available'?: string;
		}
	}
}

export {};
