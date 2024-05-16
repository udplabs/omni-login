import { useSignalEffect } from '@preact/signals-react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { Login, LoginId, LoginPassword, OmniLoginPassword, SignupId, Signup } from 'components';
import { prompt, state } from 'signals';

export const Router = () => {
	const navigate = useNavigate();

	useSignalEffect(() => {
		if (!!prompt.value && !!state.value) {
			switch (prompt.value as UL.ScreenPrompt) {
				case 'login':
					navigate('/login?state=' + state.value);
					break;
				case 'login-id':
					navigate('/login/identifier?state=' + state.value);
					break;
				case 'login-password':
					navigate('/login/password?state=' + state.value);
					break;
				case 'signup':
					navigate('/signup?state=' + state.value);
					break;
				case 'signup-id':
					navigate('/signup/identifier?state=' + state.value);
					break;
				case 'signup-password':
					navigate('/signup/password?state=' + state.value);
					break;
				// TODO - implement passkeys
				// case 'passkeys':
				// 		if (screen.value.name === 'passkey-enrollment') {
				// 	navigate('/u/passkeys')
				// }
				// break;
			}
		}
	});

	return (
		// <div className='overflow-hidden bg-black items-center flex justify-center justify-items-center h-screen'>
		<main className='widget-auto-layout'>
			<Routes>
				<Route path='/signup'>
					{/* <Route path='identifier' element={<OmniLogin />} /> */}
					<Route path='identifier' element={<SignupId />} />
					<Route path='password' element={<OmniLoginPassword />} />
					{/* <Route path='password' element={<SignupPassword />} /> */}
					<Route element={<Signup />} />
				</Route>
				<Route path='/login'>
					<Route path='identifier' element={<LoginId />} />
					<Route path='password' element={<LoginPassword />} />
					<Route element={<Login />} />
				</Route>
				<Route path='/passkeys'>{/* TODO - implement passkeys */}</Route>
				<Route path='*' element={<LoginId />} />
			</Routes>
		</main>
	);
};
