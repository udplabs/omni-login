import { ButtonWhite } from 'components';
import { SOCIAL_CONNECTIONS } from 'constants';

export const SocialConnections = () => {
	return SOCIAL_CONNECTIONS.map((connection) => (
		<ButtonWhite type='submit' name='connection' value={connection.connection}>
			<img className='inline-block mr-4' width='20' height='20' src={connection.icon} />
			Continue with {connection.name}
		</ButtonWhite>
	));
};
