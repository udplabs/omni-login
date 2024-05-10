import {
	DetectBrowserCapabilities,
	Input,
	InputEditLink,
	PromptForm,
	PromptSubmitButton,
	StyledLink,
	Text,
} from 'components';
import { pwd } from 'signals';

export const LoginPassword = () => {
	return (
		<PromptForm
			title='Enter your password'
			description='Enter your password for login0 to continue to All Applications'
		>
			<InputEditLink label='Email address' name='username' link='edit_email' />
			<Input autoFocus {...{ label: 'Password', name: 'password', type: 'password', value: pwd.value ?? undefined }} />
			<Text>
				<StyledLink link='forgot_password'>Forgot password?</StyledLink>
			</Text>
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Don't have an account? <StyledLink link='signup'>Sign up</StyledLink>
			</Text>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
