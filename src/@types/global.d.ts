declare global {
	interface GetDeviceCodeOptions {
		audience?: string;
		connection?: string;
		client_id: string;
		scope: string;
	}
	interface GetDeviceCodeResponse {
		device_code: string;
		user_code: string;
		verification_uri: string;
		verification_uri_complete: string;
		expires_in: number;
		interval: number;
	}
	interface GetDeviceTokensOptions {
		deviceCode: string;
		/**
		 * Time in seconds to wait between polling.
		 */
		interval?: number;
		/**
		 * Max time (in seconds) to poll before cancelling.
		 */
		maxPollingTime?: number;
		redirectUri?: string;
	}

	interface GetTokenSuccessResponse {
		access_token: string;
		refresh_token: string;
		id_token: string;
		token_type: 'Bearer';
		expires_in: number;
	}
	interface GetErrorResponse {
		error: string;
		error_description?: string;
	}
}

export {};
