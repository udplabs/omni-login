import { Button, Input, PromptForm, PromptSubmitButton, Text } from '..';

export const Login = () => {
	return (
		<PromptForm
			alternateAction={
				<Text>
					Don't have an account? <Button link='signup'>Sign up</Button>
				</Text>
			}
		>
			<Input label='Email address' name='username' autoFocus />
			<Input label='Password' type='password' name='password' />
			<Text>
				<Button link='forgot_password'>Forgot password?</Button>
			</Text>
			<PromptSubmitButton>Continue</PromptSubmitButton>
		</PromptForm>
	);
};
