import { DetectBrowserCapabilities, Input, PromptForm, PromptSubmitButton } from 'components';
// import { state, updateTxData, username, pwd } from 'signals';

export const OmniLogin = () => {
	// const onSubmit: React.FormEventHandler = async (event) => {
	// 	event.preventDefault();

	// 	console.log('submitting form...');

	// 	try {
	// 		console.log('username:', username.peek());
	// 		console.log('password:', pwd.peek());

	// 		const data: UL.UnsafeTransactionData['submitted_form_data'] = {
	// 			state: state.value,
	// 			action: 'default',
	// 		};

	// 		if (!!username.value) {
	// 			data.email = username.value;
	// 		}
	// 		if (!!pwd.value) {
	// 			data.password = pwd.value;
	// 		}

	// 		const formBody = new URLSearchParams(data);

	// 		const response = await fetch(`${window.location.href}?state=${state.value}`, {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
	// 			body: formBody.toString(),
	// 			// redirect: 'manual',
	// 		});

	// 		console.log('status:', response.status);
	// 		if (response.status !== 302) {
	// 			const html = await response.text(); // Get the HTML content of the response;
	// 			const scriptTag = document.createElement('div');
	// 			scriptTag.innerHTML = html; // Create a temporary DOM element to parse the HTML

	// 			// Extract the content of the script tag
	// 			const innerText = scriptTag.querySelector('script')!.innerText;
	// 			const match = innerText.match(/atob\("([^"]+)"\)/);
	// 			const base64String = !!match && match[1];
	// 			if (!!base64String) {
	// 				// Decode the base64-encoded value and update the signal
	// 				const decoded = JSON.parse(atob(base64String));
	// 				updateTxData(decoded);
	// 			}
	// 		}
	// 	} catch (error: unknown) {
	// 		console.log(error);
	// 	}
	// };
	return (
		<PromptForm {...{ description: 'Enter your email to get started.', title: 'Welcome' }}>
			<Input label='Email address' name='email' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<DetectBrowserCapabilities />
		</PromptForm>
	);
};
