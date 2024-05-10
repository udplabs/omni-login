interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export const Button = ({ children, type, className, ...attributes }: React.PropsWithChildren<IButtonProps>) => {
	return (
		<button
			className={`
        bg-blue-700

        text-center
        font-normal
        text-white

        rounded

        px-1
        mb-2

        hover:bg-blue-800

        focus:outline focus:outline-4
        focus:outline-sky-700/15

        disabled:bg-gray-400
        disabled:default-cursor

        ${className ?? ''}
      `}
			type={type ?? 'button'}
			{...attributes}
		>
			{children}
		</button>
	);
};
