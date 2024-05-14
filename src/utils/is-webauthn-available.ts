export const isWebauthnAvailable = () => navigator?.credentials && typeof PublicKeyCredential != 'undefined';
