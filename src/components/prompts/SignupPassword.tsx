import { Button, Input, InputEditLink, PromptForm, PromptSubmitButton, Text } from 'components';

export const SignupPassword = () => {
	return (
		<PromptForm
			title='Create Your Account'
			description='Set your password to continue.'
			alternateAction={
				<Text className='text-center'>
					Already have an account? <Button link='login'>Log in</Button>
				</Text>
			}
		>
			<InputEditLink label='Email address' name='email' link='edit_email' />
			<Input label='Password' name='password' type='password' autoComplete='new-password' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
		</PromptForm>
	);
};
