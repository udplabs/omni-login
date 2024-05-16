import { Button } from 'components';
import { socialConnections } from 'signals';
import apple from 'assets/connections/apple.svg';
import google from 'assets/connections/google.svg';
import ms from 'assets/connections/ms.svg';

const SOCIAL_CONNECTIONS: UL.SocialConnections = {
	'google-oauth2': { name: 'Google', icon: google },
	windowslive: { name: 'Microsoft Account', icon: ms },
	apple: { name: 'Apple', icon: apple },
};

export const SocialConnections = () => {
	console.log(google);
	return (
		<div key='social-connections' className='social-connections'>
			{socialConnections.value.map((connection) => {
				const { icon, name } = SOCIAL_CONNECTIONS[connection] || {};

				return (
					<Button key={`${connection}-button`} type='submit' name='connection' className='secondary' value={connection}>
						<span className='social-icon' style={{ backgroundImage: `url("${icon}")` }} />
						<span className='social-label'>{`Continue with ${name}`}</span>
					</Button>
				);
			})}
		</div>
	);
};
