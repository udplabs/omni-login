interface IButtonWhiteProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export const ButtonWhite = (props: React.PropsWithChildren<IButtonWhiteProps>) => {
	const { children, type, className, ...attributes } = props;

	return (
		<button
			className={`
        block
        w-full
        text-left

        mb-1
        px-4
        py-4

        border
        border-neutral-400

        rounded

        hover:bg-gray-200

        focus:outline
        focus:outline-4
        focus:outline-sky-700/15

        ${className ?? ''}
      `}
			type={type ?? 'button'}
			{...attributes}
		>
			{children}
		</button>
	);
};
