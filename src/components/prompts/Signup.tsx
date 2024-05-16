import { Button, Input, PromptForm, PromptSubmitButton, Text } from 'components';

export const Signup = () => {
	return (
		<PromptForm title='Welcome' description='Sign Up to login0 to continue to All Applications.'>
			<Input label='Email address' name='email' autoFocus />
			<Input label='Password' type='password' name='password' />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Already have an account? <Button link='login'>Log in</Button>
			</Text>
		</PromptForm>
	);
};
