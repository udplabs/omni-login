// import { isMobile } from 'react-device-detect';

import {
	Button,
	// ButtonPasskeyLogin,
	DetectBrowserCapabilities,
	Input,
	LoginQR,
	PromptForm,
	PromptSubmitButton,
	Text,
} from 'components';
import { isQRCode } from 'signals';

export const LoginId = () => {
	if (isQRCode.value) {
		return <LoginQR />;
	}

	return (
		<PromptForm
			includeSocialConnections={true}
			alternateAction={
				<Text>
					Don't have an account? <Button link='signup'>Sign up</Button>
				</Text>
			}
			// alternateAction={passkeyConfig.value ? <ButtonPasskeyLogin /> : null}
		>
			<Input type='email' label='Email address*' name='username' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>

			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
