import { createRef, useRef } from 'react';
import { Button, GoogleButton } from 'components';

import apple from 'assets/connections/apple.svg';
import google from 'assets/connections/google.svg';
import ms from 'assets/connections/ms.svg';

import { enableGtap, isQRCode, qrCodeEnabled, socialConnections, state, username } from 'signals';

const SOCIAL_CONNECTIONS: UL.SocialConnections = {
	'google-oauth2': { name: 'Google', icon: google },
	windowslive: { name: 'Microsoft Account', icon: ms },
	apple: { name: 'Apple', icon: apple },
};

export const SocialConnections = () => {
	const formRefs = useRef<Record<string, React.RefObject<HTMLFormElement>>>({});

	const lastUsed = localStorage.getItem('social-connection');

	const onSubmit = (e?: React.FormEvent<HTMLFormElement>, ref?: React.RefObject<HTMLFormElement>) => {
		const connection = e?.currentTarget?.dataset['connection'] ?? ref?.current?.dataset['connection'];

		if (connection) {
			localStorage.setItem('social-connection', connection);
		}

		if (e?.currentTarget?.submit) {
			e.currentTarget.submit();
		} else if (ref?.current?.submit) {
			ref.current.submit();
		}
	};

	return (
		<div key='social-connections' className='social-connections'>
			{qrCodeEnabled.value &&
				(isQRCode.value ? (
					<Button
						className='secondary'
						style={{
							marginBottom: '8px',
						}}
						onClick={() => (isQRCode.value = false)}
					>
						<span
							className='social-icon'
							style={{
								backgroundImage: `url(${'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA3L2pvYjEwMjQtZWxlbWVudC0xMS1wLnBuZw.png'})`,
							}}
						/>
						Continue with Email
					</Button>
				) : (
					<Button
						className='secondary'
						style={{
							marginBottom: '8px',
						}}
						onClick={() => (isQRCode.value = true)}
					>
						<span
							className='social-icon'
							style={{
								backgroundImage: `url(${'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwdAz8Wa7BbOT9uf2bza5MUZvvtsG8pfu9fA&s'})`,
							}}
						/>
						Continue with QR Code
					</Button>
				))}
			{socialConnections.value.map((connection) => {
				const { icon, name } = SOCIAL_CONNECTIONS[connection] || {};

				if (!formRefs.current[connection]) {
					formRefs.current[connection] = createRef<HTMLFormElement>();
				}

				return (
					<form
						{...{
							method: 'POST',
							onSubmit,
							ref: formRefs.current[connection],
							id: `${connection}-form`,
							'data-connection': connection,
						}}
					>
						<input type='hidden' name='state' value={state.value} />
						<input type='hidden' name='connection' value={connection} />
						{username.value && <input type='hidden' name='login_hint' value={username.value} />}
						{enableGtap.value && connection === 'google-oauth2' ? (
							<GoogleButton formRef={formRefs.current[connection]} {...{ onSubmit }} />
						) : (
							<Button key={`${connection}-button`} type='submit' className='secondary'>
								<span className='social-icon' style={{ backgroundImage: `url("${icon}")` }} />
								<span className='social-label'>{`Continue with ${name}`}</span>
								{lastUsed === connection && <span className='recent'>Last Used</span>}
							</Button>
						)}
					</form>
				);
			})}
		</div>
	);
};
