import { Login, LoginId, LoginPassword, OmniLogin, PasskeyEnrollment, Signup, SignupPassword } from 'components';

import { errors, fieldErrors, prompt, screen } from 'signals';

export const PromptSwitch = () => {
	let promptComponent = <>{prompt}</>;

	if (errors.value.length > 0) {
		console.group('=== ERRORS ==');
		console.log(JSON.stringify(errors.value, null, 2));

		const doLogin = errors.value.findIndex((e) => e.code === 'auth0-users-validation') > -1;
		console.log('doLogin:', doLogin);
		console.groupEnd();
	}
	if (fieldErrors.value.length > 0) {
		console.group('=== FIELD ERRORS ==');
		console.log(JSON.stringify(fieldErrors.value, null, 2));
		console.groupEnd();
	}

	switch (prompt.value as UL.ScreenPrompt) {
		case 'login':
			promptComponent = <Login />;
			break;
		case 'login-id':
			promptComponent = <LoginId />;
			break;
		case 'login-password':
			promptComponent = <LoginPassword />;
			break;
		case 'signup':
			promptComponent = <Signup />;
			break;
		case 'signup-id':
			promptComponent = <OmniLogin />;
			break;
		case 'signup-password':
			promptComponent = <SignupPassword />;
			break;
		case 'passkeys':
			if (screen.value === 'passkey-enrollment') {
				promptComponent = <PasskeyEnrollment />;
			}
			break;
	}

	return (
		<div className='overflow-hidden bg-black items-center flex justify-center justify-items-center h-screen'>
			{promptComponent}
		</div>
	);
};
