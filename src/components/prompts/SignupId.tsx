import { Button, DetectBrowserCapabilities, Input, PromptForm, PromptSubmitButton, Text } from 'components';

export const SignupId = () => {
	return (
		<PromptForm
			includeSocialConnections
			title='Create Your Account'
			description='Sign Up to login0 to continue to All Applications.'
		>
			<Input label='Email address*' name='email' inputMode='email' autoCapitalize='none' spellCheck='false' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text className='text-center'>
				Already have an account? <Button link='login'>Log in</Button>
			</Text>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
