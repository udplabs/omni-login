import { promptErrors } from 'signals';

interface IPromptErrorProps {
	className: string;
}

export const PromptErrors = (props: IPromptErrorProps) => {
	const { className } = props;
	const errors = promptErrors.value;

	if (!errors.length) {
		return <></>;
	}

	return (
		<ul className={`bg-red-700 text-white rounded p-2 text-center ${className ?? ''}`}>
			{errors?.map((error) => (
				<li key={error.code}>
					{error.message}
					{error.field && ` - Field: ${error.field}`}
				</li>
			))}
		</ul>
	);
};
