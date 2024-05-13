import { FieldError } from 'components/inputs/FieldError';
import basicInputClasses from './BasicInput.module.css';

interface IBasicInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	errors: UL.Error[];
	postInput?: JSX.Element;
}

export const BasicInput = ({ errors, readOnly, label, type, postInput, ...attributes }: IBasicInputProps) => {
	const name = attributes.name;
	const id = attributes.id || name;

	const containerClassNames = ['mb-2', 'relative', 'w-full', 'flex'];

	if (errors?.length) {
		containerClassNames.push('border-red-600', 'text-red-600');
		if (!readOnly) {
			containerClassNames.push('focus-within:border-red-600', 'focus-within:outline-red-600');
		}
	}

	const containerClassName = containerClassNames.join(' ');

	return (
		<>
			<div className={containerClassName}>
				<label className={basicInputClasses.label} htmlFor={id}>
					{label}
				</label>
				<input type={type || 'text'} placeholder={' '} {...attributes} id={id} readOnly={readOnly} />
				{postInput && <div className='flex-initial items-center justify-content-center flex'>{postInput}</div>}
			</div>
			{errors?.map((error) => (
				<FieldError error={error} />
			))}
		</>
	);
};
