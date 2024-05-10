interface ITextProps {
	className?: string;
}

export const Text = ({ children, className }: React.PropsWithChildren<ITextProps>) => {
	return <p className={`text-sm mb-4 text-gray-800 ${className ?? ''} relative`}>{children}</p>;
};
