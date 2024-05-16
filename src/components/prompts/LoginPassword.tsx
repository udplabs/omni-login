import {
	Button,
	DetectBrowserCapabilities,
	Input,
	InputEditLink,
	PromptForm,
	PromptSubmitButton,
	Text,
} from 'components';
import { pwd } from 'signals';

export const LoginPassword = () => {
	return (
		<PromptForm
			title='Enter your password'
			description='Enter your password for login0 to continue to All Applications'
			includeSocialConnections
		>
			<InputEditLink name='username' link='edit_email' />
			<Input autoFocus {...{ label: 'Password', name: 'password', type: 'password', value: pwd.value ?? undefined }} />
			<Text>
				<Button link='forgot_password'>Forgot password?</Button>
			</Text>
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text>
				Don't have an account? <Button link='signup'>Sign up</Button>
			</Text>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
