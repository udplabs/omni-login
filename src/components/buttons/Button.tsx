import { links } from 'signals';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	href?: string;
	link?: UL.TransactionLinkTypes;
}

export const Button = ({
	children,
	href,
	link,
	type,
	className = '',
	...attributes
}: React.PropsWithChildren<IButtonProps>) => {
	if (!href && !!link) {
		href = links.value[link];
	}

	if (!!href) {
		return <a {...{ className, href }}>{children}</a>;
	}

	return (
		<button type={type ?? 'button'} {...{ className, ...attributes }}>
			{children}
		</button>
	);
};
