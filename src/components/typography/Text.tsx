interface ITextProps {
	className?: string;
}

export const Text = ({ children, className }: React.PropsWithChildren<ITextProps>) => {
	return <p className={`subtitle ${className ?? ''}`}>{children}</p>;
};
