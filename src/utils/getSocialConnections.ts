const { VITE_SOCIAL_CONNECTIONS: SOCIAL_CONNECTIONS } = import.meta.env;

export const getSocialConnections = (clientId?: string) => {
	console.log('fetching connections for', clientId);

	const socialConnections: UL.SocialConnection[] = [];
	let connections: string[] = [];

	if (SOCIAL_CONNECTIONS) {
		const connectionsArray = SOCIAL_CONNECTIONS.split(',') || [];

		connectionsArray.forEach((c) => {
			const [clientId, ...connections] = c.split('|');

			socialConnections.push({ clientId, connections });
		});
	}

	if (!!clientId) {
		connections = socialConnections.find((c) => c.clientId === clientId)?.connections ?? [];
	}

	return connections;
};
