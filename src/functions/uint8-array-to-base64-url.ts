export const uint8ArrayToBase64Url = (arraybuffer: ArrayBufferLike) => {
	if (!arraybuffer) {
		return null;
	}
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

	var bytes = new Uint8Array(arraybuffer);
	let base64url = '';

	for (let i = 0; i < bytes.length; i += 3) {
		base64url += chars[bytes[i] >> 2];
		base64url += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
		base64url += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
		base64url += chars[bytes[i + 2] & 63];
	}

	if (bytes.length % 3 === 2) {
		base64url = base64url.substring(0, base64url.length - 1);
	} else if (bytes.length % 3 === 1) {
		base64url = base64url.substring(0, base64url.length - 2);
	}

	return base64url;
};
