import { useState } from 'react';
import { useSignalEffect } from '@preact/signals-react';
import { BasicInput } from 'components/inputs/BasicInput';

import { errors, fieldErrors, submitted_form_data, pwd, username } from 'signals';

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	name: string;
	postInput?: JSX.Element;
}

export const Input = ({ label, name, postInput, type, ...attributes }: IInputProps) => {
	// TODO: this can be made way better using signals, but not right now
	useSignalEffect(() => {
		let updatedField = false;

		const newErrors: UL.Error[] = errors.value
			.filter((e) => e.field === name)
			.map((e) => {
				if (e?.usedField) return e;

				updatedField = true;

				return { ...e, usedField: true };
			});

		if (updatedField) {
			errors.value = newErrors;
		}

		fieldErrors.value = newErrors;
	});

	// if (type === 'password') {
	// 	return <BasicInput errors={fieldErrors.value} {...{ label, name, postInput, type, ...attributes }} />;
	// }

	const [inputValue, setInputValue] = useState(submitted_form_data.value[name]);

	const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		if (type === 'password') {
			pwd.value = value;
		} else {
			username.value = value;
		}

		setInputValue(value);
	};

	return (
		<BasicInput
			value={inputValue}
			onChange={handleOnChange}
			errors={fieldErrors.value}
			{...{ label, name, postInput, type, ...attributes }}
		/>
	);
};
