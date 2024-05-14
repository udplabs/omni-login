import { isWebauthnAvailable } from './is-webauthn-available';

/*
 * there was an issue discovered when using the iOS Google app on iOS version 15.4
 * where the webauthn flow was not performing correctly due to isUserVerifyingPlatformAuthenticatorAvailable()
 * not resolving from within the Google app, here we implement some timeout logic
 * that will return a promise rejection in this case
 */
export const isWebauthnPlatformAvailable = async (): Promise<boolean> => {
	return new Promise((resolve) => {
		if (!isWebauthnAvailable()) {
			resolve(false);
			return;
		}
		setTimeout(async () => {
			const result = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();

			resolve(result);
		}, 1000);
	});
};
