import { Input, Button } from 'components';

interface IInputEditLinkProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	link: UL.TransactionLinkTypes;
}

export const InputEditLink = ({ link, ...attributes }: IInputEditLinkProps) => {
	return (
		<Input
			{...{ className: 'edit-link-input', ...attributes }}
			readOnly
			postInput={<Button {...{ link }}>Edit</Button>}
		/>
	);
};
