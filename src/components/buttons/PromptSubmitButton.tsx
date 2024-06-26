import { Button } from 'components';

interface IPromptSubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	value?: string;
}

export const PromptSubmitButton = ({
	children,
	value,
	...attributes
}: React.PropsWithChildren<IPromptSubmitButtonProps>) => {
	return (
		<Button type='submit' name='action' value={value ?? 'default'} className='primary' {...attributes}>
			{children}
		</Button>
	);
};
