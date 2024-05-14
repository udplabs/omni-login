import { redirect } from 'react-router-dom';
import { Input, InputEditLink, PromptForm, PromptSubmitButton, StyledLink, Text } from 'components';
import { isLoading, isOmni, pwd, state, updateTxData, username } from 'signals';
import { isBrave, isWebauthnAvailable, isWebauthnPlatformAvailable } from 'utils';

export const OmniLoginPassword = () => {
	const onSubmit: React.FormEventHandler = async (event) => {
		event.preventDefault();
		function updateWindow(data?: UL.TransactionData) {
			console.log('manually updating window...');
			if (!!data) {
				console.log(JSON.stringify(data, null, 2));
				(window as any).universal_login_transaction_data = data;
			}
		}

		async function doFetch(
			prompt: UL.ScreenPrompt,
			data: UL.FormData,
			options?: { follow?: boolean; method?: 'GET' | 'POST' }
		) {
			const { follow = false, method = 'POST' } = options || {};

			let decoded: UL.TransactionData = (window as any).universal_login_transaction_data;

			let url = `${window.location.origin}/u`;

			switch (prompt) {
				case 'login':
				case 'login-password':
					url += '/login/password';
					break;
				case 'login-id':
					url += '/login/identifier';
					break;
				case 'signup':
				case 'signup-password':
					url += '/signup/password';
					break;
				case 'signup-id':
					url += '/signup/identifier';
					break;
			}

			if (prompt.includes('login')) {
				data = {
					'js-available': 'true',
					'is-brave': (await isBrave()).toString(),
					'webauthn-available': isWebauthnAvailable().toString(),
					'webauthn-platform-available': (await isWebauthnPlatformAvailable()).toString(),
					...data,
				};
			}

			url += `?state=${state.value}`;

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: method === 'GET' ? undefined : new URLSearchParams({ action: 'default', state: state.value, ...data }),
				redirect: follow ? 'manual' : undefined,
			});

			const redirectUri = response.headers.get('Location');

			console.log(response);

			if (!response.url.includes('/consent') && response.status !== 302) {
				// Not a redirect, let's update the transaction_data
				const html = await response.text(); // Get the HTML content of the response;
				const scriptTag = document.createElement('div');
				scriptTag.innerHTML = html; // Create a temporary DOM element to parse the HTML

				// Extract the content of the script tag
				const innerText = scriptTag.querySelector('script')?.innerText;
				if (innerText) {
					const match = innerText.match(/atob\("([^"]+)"\)/);
					const base64String = !!match && match[1];
					if (!!base64String) {
						// Decode the base64-encoded value and update the window
						decoded = JSON.parse(atob(base64String));

						if (decoded) {
							updateWindow(decoded);
						}
					}
				}
			} else {
				if (redirectUri && follow) {
					console.log('redirecting...');
					redirect(redirectUri, response);
				}
			}

			return { redirectUri, tx_data: decoded, response };
		}

		try {
			if (!!username.value && !!pwd.value) {
				console.log('submitting form...');

				// Set the loader
				isLoading.value = true;

				// This is our first call to /signup/password
				const signupPasswordRes = await doFetch('signup-password', { username: username.value, password: pwd.value });

				if (
					signupPasswordRes?.response?.status === 400 &&
					signupPasswordRes?.tx_data &&
					signupPasswordRes?.tx_data.errors.findIndex((e) => e.code === 'auth0-users-validation') > -1
				) {
					// signup failed, let's try login

					// TODO: We can probably remove this...
					// update the window just to be safe
					updateWindow({
						...signupPasswordRes.tx_data,
						unsafe_data: {
							...signupPasswordRes.tx_data?.unsafe_data,
							submitted_form_data: {
								username: username.value ?? signupPasswordRes.tx_data?.unsafe_data?.submitted_form_data?.email,
								...signupPasswordRes.tx_data?.unsafe_data.submitted_form_data,
							},
						},
						prompt: { name: 'login-id' },
						screen: { name: 'login-id' },
					} as UL.TransactionData & {
						prompt: UL.Prompt<'login-id'>;
						screen: UL.Screen<'login-id'>;
					});

					// We need to make a 'GET' to /login/identifier first
					await doFetch('login-id', { username: username.value }, { method: 'GET' });

					// Then we need to make a 'POST' to /login/identifier
					const loginIdRes = await doFetch('login-id', { username: username.value });

					if (loginIdRes?.tx_data) {
						isOmni.value = true;
						updateTxData(loginIdRes.tx_data);
					}
				}
			}
		} catch (error: unknown) {
			console.log(error);
		}
	};

	return (
		<PromptForm
			{...{
				title: 'Create Your Account',
				onSubmit,
				description: 'Set your password for login0 to continue to All Applications',
			}}
		>
			<InputEditLink label='Email address*' name='email' link='edit_email' />
			<Input label='Password' name='password' type='password' autoComplete='current-password' autoFocus />
			<PromptSubmitButton>Continue</PromptSubmitButton>
			<Text>
				Already have an account? <StyledLink link='login'>Log in</StyledLink>
			</Text>
		</PromptForm>
	);
};
