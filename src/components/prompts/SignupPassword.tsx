import { ButtonAction, Input, InputEditLink, PromptForm, PromptSubmitButton, StyledLink, Text } from 'components';

export const SignupPassword = () => {
	return (
		<PromptForm title='Create Your Account' description='Set your password for login0 to continue to All Applications'>
			<InputEditLink label='Email address' name='email' link='edit_email' />
			<Input label='Password' name='password' type='password' autoComplete='new-password' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Already have an account? <StyledLink link='login'>Log in</StyledLink>
			</Text>
			<Text className='text-center'>
				<ButtonAction action='back'>Go back</ButtonAction>
			</Text>
		</PromptForm>
	);
};
