import { DetectBrowserCapabilities, Input, PromptForm, PromptSubmitButton, StyledLink, Text } from 'components';

export const SignupId = () => {
	return (
		<PromptForm title='Create Your Account' description='Sign Up to login0 to continue to All Applications.'>
			<Input label='Email address' name='email' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Already have an account? <StyledLink link='login'>Log in</StyledLink>
			</Text>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
