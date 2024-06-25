import { Button, DetectBrowserCapabilities, Input, PromptForm, PromptSubmitButton, Text } from 'components';

export const SignupId = () => {
	return (
		<PromptForm
			includeSocialConnections
			title='Create Your Account'
			description='Sign Up to continue.'
			alternateAction={
				<Text>
					Already have an account? <Button link='login'>Log in</Button>
				</Text>
			}
		>
			<Input label='Email address*' name='email' inputMode='email' autoCapitalize='none' spellCheck='false' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
