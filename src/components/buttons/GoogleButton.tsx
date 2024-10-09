import { GoogleLogin } from '@react-oauth/google';

export const GoogleButton = () => {
	console.log('rendering google button!');
	return (
		<GoogleLogin
			auto_select
			{...{
				ux_mode: 'popup',
				shape: 'rectangular',
				logo_alignment: 'left',
				text: 'continue_with',
				locale: 'en-US',
				onError: () => console.log('Something went wrong w/ Google...'),
				onSuccess: (resp) => {
					console.log(resp);
				},
				click_listener: () => {},
			}}
		/>
	);
};
