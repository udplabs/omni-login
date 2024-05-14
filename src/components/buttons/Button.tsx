interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export const Button = ({ children, type, className, ...attributes }: React.PropsWithChildren<IButtonProps>) => {
	return (
		<button type={type ?? 'button'} {...{ className, ...attributes }}>
			{children}
		</button>
	);
};
