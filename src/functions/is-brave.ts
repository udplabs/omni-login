export const isBrave = async () => {
	// needs to be as any as brave does not exist on all
	const isBrave = await (navigator as any)?.brave?.isBrave();
	return !!isBrave;
};
