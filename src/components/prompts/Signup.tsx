import { Button, Input, PromptForm, PromptSubmitButton, Text } from 'components';

export const Signup = () => {
	return (
		<PromptForm
			description='Sign Up to continue.'
			alternateAction={
				<Text>
					Already have an account? <Button link='login'>Log in</Button>
				</Text>
			}
		>
			<Input label='Email address' name='email' autoFocus />
			<Input label='Password' type='password' name='password' />
			<PromptSubmitButton>Continue</PromptSubmitButton>
		</PromptForm>
	);
};
