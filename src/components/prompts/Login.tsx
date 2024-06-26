import { Button, Input, PromptForm, PromptSubmitButton, Text } from '..';

export const Login = () => {
	return (
		<PromptForm title='Welcome' description='Log in to Auth0 to continue to Auth0 Dashboard.'>
			<Input label='Email address' name='username' autoFocus />
			<Input label='Password' type='password' name='password' />
			<Text>
				<Button link='forgot_password'>Forgot password?</Button>
			</Text>
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Don't have an account? <Button link='signup'>Sign up</Button>
			</Text>
		</PromptForm>
	);
};
