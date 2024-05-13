interface ITextProps {
	className?: string;
}

export const Text = ({ children, className }: React.PropsWithChildren<ITextProps>) => {
	return <p className={`text-sm mb-4 text-gray-80 subtitle ${className ?? ''} relative`}>{children}</p>;
};
