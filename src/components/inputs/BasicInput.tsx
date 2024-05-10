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

	const labelClassNames = [
		'absolute',
		'left-0',
		'pointer-events-none',
		'radius-[2px]',

		'bg-white',
		'ml-4',
		'px-1',

		basicInputClasses.label,
	];

	const containerClassNames = [
		'mb-2',
		'relative',
		'border',
		'rounded',
		'w-full',
		'flex',
		'text-gray-700',
		'leading-tight',
	];

	const inputClassNames = [
		'bg-transparent',
		'focus-visible:outline-none',
		'read-only:cursor-default',
		'text-gray-800',
		'appearance-none',
		'py-4',
		'flex-1',
		'px-5',
	];

	if (!errors?.length) {
		containerClassNames.push('border-neutral-300', 'text-stone-500');
		if (!readOnly) {
			containerClassNames.push(
				'focus-within:border-sky-700',
				'focus-within:outline-sky-700',
				'focus-within:text-sky-700'
			);
		}
	} else {
		containerClassNames.push('border-red-600', 'text-red-600');
		if (!readOnly) {
			containerClassNames.push('focus-within:border-red-600', 'focus-within:outline-red-600');
		}
	}

	if (readOnly) {
		containerClassNames.push('bg-stone-50');
		inputClassNames.push('text-ellipsis');
	} else {
		containerClassNames.push('focus-within:outline', 'focus-within:outline-1');
	}

	const containerClassName = containerClassNames.join(' ');
	const labelClassName = labelClassNames.join(' ');
	const inputClassName = inputClassNames.join(' ');

	return (
		<>
			<div className={containerClassName}>
				<label className={labelClassName} htmlFor={id}>
					{label}
				</label>
				<input
					className={inputClassName}
					type={type || 'text'}
					placeholder={' '}
					{...attributes}
					id={id}
					readOnly={readOnly}
				/>
				{postInput && <div className='flex-initial items-center justify-content-center flex'>{postInput}</div>}
			</div>
			{errors?.map((error) => (
				<FieldError error={error} />
			))}
		</>
	);
};
