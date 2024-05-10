import { Input, LinkButton } from 'components';

interface IInputEditLinkProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	link: UL.TransactionLinkTypes;
}

export const InputEditLink = ({ link, ...attributes }: IInputEditLinkProps) => {
	return (
		<Input
			{...attributes}
			readOnly
			postInput={
				<LinkButton {...{ link }} className='py-1 px-2 mx-2'>
					Edit
				</LinkButton>
			}
		/>
	);
};
