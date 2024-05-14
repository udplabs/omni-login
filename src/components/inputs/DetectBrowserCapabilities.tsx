import { useEffect, useState } from 'react';

import { isBrave, isWebauthnAvailable, isWebauthnPlatformAvailable } from 'utils';

export const DetectBrowserCapabilities = () => {
	const [jsAvailable, setJsAvailable] = useState(false);
	const [isBraveBoolean, setIsBraveBoolean] = useState(false);
	const [webauthnPlatformAvailable, setWebauthnPlatformAvailable] = useState(false);

	const webauthnAvailable = isWebauthnAvailable();

	useEffect(() => {
		setJsAvailable(true);

		async function checkIsBrave() {
			setIsBraveBoolean(await isBrave());
		}
		async function checkIfWebauthnPlatformAvailable() {
			setWebauthnPlatformAvailable(await isWebauthnPlatformAvailable());
		}

		checkIfWebauthnPlatformAvailable();
		checkIsBrave();
	}, []);

	return (
		<>
			<input type='hidden' name='js-available' value={jsAvailable.toString()} />
			<input type='hidden' name='is-brave' value={isBraveBoolean.toString()} />
			<input type='hidden' name='webauthn-available' value={webauthnAvailable.toString()} />
			<input type='hidden' name='webauthn-platform-available' value={webauthnPlatformAvailable.toString()} />
		</>
	);
};
