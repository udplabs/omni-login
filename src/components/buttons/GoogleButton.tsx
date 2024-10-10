import { GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose';

import { username } from 'signals';

import { CredentialResponse } from '@react-oauth/google';

export const GoogleButton = ({ formRef, onSubmit }: GoogleButtonProps) => {
	const handleSuccess = ({ credential }: CredentialResponse) => {
		if (credential) {
			const { email } = decodeJwt(credential) || {};

			if (email) {
				console.log('email:', email);
				username.value = email as string;

				if (!!formRef && formRef.current && onSubmit) {
					onSubmit(undefined, formRef);
				}
			}
		}
	};

	return (
		<GoogleLogin
			auto_select
			{...{
				text: 'continue_with',
				onError: () => console.log('Something went wrong w/ Google...'),
				onSuccess: handleSuccess,
				width: '320px',
				logo_alignment: 'left',
				allowed_parent_origin: window.location.origin,
			}}
		/>
	);
};

interface GoogleButtonProps {
	formRef?: React.RefObject<HTMLFormElement>;
	onSubmit?: (e?: React.FormEvent<HTMLFormElement>, ref?: React.RefObject<HTMLFormElement>) => void;
}
