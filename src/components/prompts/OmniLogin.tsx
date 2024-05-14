import { DetectBrowserCapabilities, Input, PromptForm, PromptSubmitButton } from 'components';

export const OmniLogin = () => {
	return (
		<PromptForm {...{ description: 'Enter your email to get started.', title: 'Welcome' }}>
			<Input label='Email address' name='email' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
