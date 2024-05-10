import { ButtonAction, ButtonPasskeySignup, IconWithDescription, PromptForm, StyledLink, Text } from 'components';
import { CDN_URL } from 'constants';

import fingerprintBlue from 'assets/fingerprint-blue.svg';
import deviceGlobeAccent from 'assets/device-globe/accent.svg';
import deviceGlobeMask from 'assets/device-globe/mask.svg';
import checkmarkShieldAccent from 'assets/checkmark-shield/accent.svg';
import checkmarkShieldMask from 'assets/checkmark-shield/mask.svg';

export const PasskeyEnrollment = () => {
	return (
		<PromptForm title='Create a passkey for All Applications on this device'>
			<IconWithDescription
				mask={`${CDN_URL}/${fingerprintBlue}`}
				title='No need to remember a password'
				description='With passkeys, you can use things like your fingerprint or face to login.'
			/>
			<IconWithDescription
				mask={deviceGlobeMask}
				accent={deviceGlobeAccent}
				title='Works on all of your devices'
				description='Passkeys will automatically be available across your synced devices.'
			/>
			<IconWithDescription
				mask={checkmarkShieldMask}
				accent={checkmarkShieldAccent}
				title='Keep your account safer'
				description='Passkeys offer state-of-the-art phishing resistance.'
			/>
			<ButtonPasskeySignup />
			<Text className='text-center mt-4'>
				<ButtonAction action='abort_passkey_enrollment'>Continue without passkeys</ButtonAction>
			</Text>
			<Text className='text-center'>
				<StyledLink link='back'>Go back</StyledLink>
			</Text>
		</PromptForm>
	);
};
