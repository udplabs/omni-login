import {
	ButtonPasskeyLogin,
	DetectBrowserCapabilities,
	Input,
	PromptForm,
	PromptSubmitButton,
	StyledLink,
	Text,
} from 'components';
import { passkey_config as passkeyConfig } from 'signals';

export const LoginId = () => {
	return (
		<PromptForm
			title='Welcome'
			description='Log in to Auth0 to continue to Auth0 Dashboard.'
			includeSocialConnections={true}
			alternateAction={passkeyConfig.value ? <ButtonPasskeyLogin /> : null}
		>
			<Input type='email' label='Email address' name='username' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Don't have an account? <StyledLink link='signup'>Sign up</StyledLink>
			</Text>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
