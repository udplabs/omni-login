import { Input, PromptForm, PromptSubmitButton, StyledLink, Text } from '..';

export const Login = () => {
	return (
		<PromptForm title='Welcome' description='Log in to Auth0 to continue to Auth0 Dashboard.'>
			<Input label='Email address' name='username' autoFocus />
			<Input label='Password' type='password' name='password' />
			<Text>
				<StyledLink link='forgot_password'>Forgot password?</StyledLink>
			</Text>
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Don't have an account? <StyledLink link='signup'>Sign up</StyledLink>
			</Text>
		</PromptForm>
	);
};
