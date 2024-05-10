import { PropsWithChildren, createContext, useState } from 'react';
import { IError } from '../interfaces/error';
import base64UrlToUint8Array from '../functions/base64-url-to-uint8-array';

const UniversalLoginTransactionDataContext = createContext({
	state: '',
	prompt: '',
	screen: '',

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getLink: (_name: string): string => '',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getAction: (_name: string): string => '',
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getSubmittedFormData: (_name: string): string => '',
	getPromptErrors: (): IError[] => [],
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getFieldErrors: (_field: string): IError[] => [],
	getPasskeyConfig: (): any => ({}),
});

export const UniversalLoginTransactionDataContextProvider = (props: PropsWithChildren) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const universal_login_transaction_data = (window as any).universal_login_transaction_data;

	const state = universal_login_transaction_data.state;
	const prompt = universal_login_transaction_data.prompt.name;
	const screen = universal_login_transaction_data.screen.name;

	const links: Record<string, string> = universal_login_transaction_data.links;
	const actions: Record<string, string> = universal_login_transaction_data.actions;
	const unsafe_data = universal_login_transaction_data.unsafe_data;
	const submitted_form_data: Record<string, string> = unsafe_data.submitted_form_data;
	const passkey_config = universal_login_transaction_data.passkey_config;

	const [errors, setErrors] = useState<IError[]>(universal_login_transaction_data.errors);

	if (passkey_config?.publicKey) {
		passkey_config.publicKey.challenge = base64UrlToUint8Array(passkey_config.publicKey.challenge);
		if (passkey_config.publicKey.user?.id) {
			passkey_config.publicKey.user.id = base64UrlToUint8Array(passkey_config.publicKey.user.id);
		}
	}

	const getLink = function (name: string) {
		return links[name] ?? '';
	};

	const getAction = function (name: string) {
		return actions[name] ?? '';
	};

	const getSubmittedFormData = function (name: string) {
		return submitted_form_data[name] ?? '';
	};

	const getPromptErrors = function () {
		return errors.filter((error) => !error.usedField);
	};

	// we set a flag of usedField to true for each error that is returned
	// this allows the above promptErrors to act as a catchall if a field
	// hasn't yet been implemented
	const getFieldErrors = function (field: string) {
		let updatedField = false;
		const newErrors: IError[] = errors
			.filter((error) => error.field === field)
			.map((error) => {
				if (error.usedField) return error;
				updatedField = true;
				return {
					...error,
					usedField: true,
				};
			});

		// Only update the state if something has changed or else we'd
		// end up in an infinite loop
		if (updatedField) {
			setErrors(newErrors);
		}

		return newErrors;
	};

	const getPasskeyConfig = function () {
		return passkey_config;
	};

	console.log(JSON.stringify(universal_login_transaction_data, null, 2));

	return (
		<UniversalLoginTransactionDataContext.Provider
			value={{
				state,
				prompt,
				screen,
				getLink,
				getAction,
				getSubmittedFormData,
				getPromptErrors,
				getFieldErrors,
				getPasskeyConfig,
			}}
		>
			{props.children}
		</UniversalLoginTransactionDataContext.Provider>
	);
};

export default UniversalLoginTransactionDataContext;
