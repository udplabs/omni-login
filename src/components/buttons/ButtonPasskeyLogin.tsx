import passkeyLogo from 'assets/passkey-logo.svg';
import { Button } from 'components';
import { isWebauthnPlatformAvailable, uint8ArrayToBase64Url } from 'utils';
import { public_key } from 'signals';

export const ButtonPasskeyLogin = () => {
	if (!public_key.value) {
		return <></>;
	}

	const onClickHandler = async function (event: any) {
		if (!public_key.value) {
			return;
		}
		event.preventDefault();

		const [credential, webauthnPlatformAvailable] = (await Promise.all([
			navigator.credentials.get({ publicKey: public_key.value }),
			isWebauthnPlatformAvailable(),
		])) as [PublicKeyCredential | null, boolean];

		if (!!credential) {
			const { id, rawId, type, authenticatorAttachment, response } = credential || {};
			const { clientDataJSON, authenticatorData, signature, userHandle } =
				(response as AuthenticatorAssertionResponse) || {};

			const encoded = {
				id,
				rawId: uint8ArrayToBase64Url(rawId),
				type,
				authenticatorAttachment,
				response: {
					clientDataJSON: uint8ArrayToBase64Url(clientDataJSON),
					authenticatorData: uint8ArrayToBase64Url(authenticatorData),
					signature: uint8ArrayToBase64Url(signature),
					userHandle: !!userHandle && uint8ArrayToBase64Url(userHandle),
				},
				isUserVerifyingPlatformAuthenticatorAvailable: webauthnPlatformAvailable,
			};

			const passkeyElement = document.createElement('input');
			passkeyElement.type = 'hidden';
			passkeyElement.name = 'passkey';
			passkeyElement.value = JSON.stringify(encoded);

			event.target.form.appendChild(passkeyElement);
			event.target.form.submit();
			event.target.form.removeChild(passkeyElement);
		}
	};

	return (
		<>
			<input type='hidden' name='action' value='default' />
			<Button className='secondary' onClick={onClickHandler}>
				<img className='inline-block mr-4' src={passkeyLogo} />
				Continue with a passkey
			</Button>
		</>
	);
};
