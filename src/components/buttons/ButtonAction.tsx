import { actions } from 'signals';

interface IButtonActionProps {
	action: UL.TransactionActions;
}

export const ButtonAction = (props: React.PropsWithChildren<IButtonActionProps>) => {
	const { children, action = '' } = props;

	return (
		<button
			className='text-sky-700 px-1 -mx-1 font-medium focus:outline focus:outline-2 focus:outline-sky-700/15 rounded'
			type='submit'
			name='action'
			value={actions.value[action as keyof UL.TransactionAction]}
		>
			{children}
		</button>
	);
};
