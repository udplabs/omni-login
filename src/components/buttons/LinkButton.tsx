import { links } from 'signals';

interface ILinkButtonProps {
	href?: string;
	link?: UL.TransactionLinkTypes;
	className?: string;
}

export const LinkButton = ({ children, className, link, href }: React.PropsWithChildren<ILinkButtonProps>) => {
	if (!href && !!link) {
		href = links.value[link];
	}

	return (
		<a
			className={`bg-blue-700 text-center inline-block font-normal hover:bg-blue-800 focus:outline focus:outline-4 focus:outline-sky-700/15 text-white px-1 rounded button-link ${
				className ?? ''
			}`}
			href={href}
		>
			{children}
		</a>
	);
};
