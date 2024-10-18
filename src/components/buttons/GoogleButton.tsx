import { GoogleLogin } from '@react-oauth/google';
import { decodeJwt } from 'jose';

import { username } from 'signals';

import { CredentialResponse } from '@react-oauth/google';

import type { GoogleLoginProps } from '@react-oauth/google';

export const GoogleButton = ({ formRef, onSubmit, containerProps, ...props }: GoogleButtonProps) => {
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
			useOneTap
			use_fedcm_for_prompt
			{...{
				text: 'continue_with',
				onError: () => console.log('Something went wrong w/ Google...'),
				onSuccess: handleSuccess,
				width: '320px',
				logo_alignment: 'left',
				cancel_on_tap_outside: false,
				ux_mode: 'popup',
				context: 'use',
				...props,
				containerProps: {
					...containerProps,
					style: {
						height: '52px',
						...containerProps?.style,
					},
				},
			}}
		/>
	);
};

interface GoogleButtonProps extends Partial<GoogleLoginProps> {
	formRef?: React.RefObject<HTMLFormElement>;
	onSubmit?: (e?: React.FormEvent<HTMLFormElement>, ref?: React.RefObject<HTMLFormElement>) => void;
}
