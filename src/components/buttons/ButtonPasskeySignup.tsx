import { PromptSubmitButton } from 'components';
import { uint8ArrayToBase64Url } from 'functions';
import { public_key } from 'signals';

export const ButtonPasskeySignup = () => {
	const onClickHandler = async (event: any) => {
		if (!public_key.value) {
			return;
		}
		event.preventDefault();

		const credential =
			((await navigator.credentials.create({
				publicKey: public_key.value,
			} as CredentialCreationOptions)) as PublicKeyCredential) || {};

		if (!!credential) {
			const { id, rawId, authenticatorAttachment, type, response } = credential;
			const { clientDataJSON, attestationObject, getTransports } = (response as AuthenticatorAttestationResponse) || {};

			const encoded: any = {
				id,
				rawId: uint8ArrayToBase64Url(rawId),
				type,
				authenticatorAttachment,
				response: {
					clientDataJSON: uint8ArrayToBase64Url(clientDataJSON),
					attestationObject: uint8ArrayToBase64Url(attestationObject),
					transports: !!getTransports ? getTransports() : undefined,
				},
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
		<PromptSubmitButton disabled={!public_key.value} onClick={onClickHandler}>
			Create a passkey
		</PromptSubmitButton>
	);
};
