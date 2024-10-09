import { QRCode as QRCodeLogo } from 'react-qrcode-logo';

import { Input, PromptForm } from 'components';
import { deviceCodeResponse } from 'signals';

export const LoginQR = () => {
	return (
		<PromptForm includeSocialConnections description='Scan the QR code to continue.'>
			<div className='qr-code'>
				<QRCodeLogo
					{...{
						value: deviceCodeResponse.value?.verification_uri_complete,
						size: 175,
						qrStyle: 'dots',
						eyeRadius: 4,
						eyeColor: '#635dff',
					}}
				/>
				<p>Verify this code on your device</p>
				<Input name='device-code' disabled value={deviceCodeResponse.value?.user_code} />
			</div>
		</PromptForm>
	);
};
