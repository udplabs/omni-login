import { links } from 'signals';

interface ILinkProps {
	href?: string;
	link?: UL.TransactionLinkTypes;
}

// Named styled link to not collide with `react-router-dom`'s `Link` component
export const StyledLink = ({ children, href, link }: React.PropsWithChildren<ILinkProps>) => {
	if (!href && !!link) {
		href = links.value[link];
	}

	return (
		<a
			className='text-sky-700 px-1 -mx-1 font-medium focus:outline focus:outline-2 focus:outline-sky-700/15 rounded'
			href={href}
		>
			{children}
		</a>
	);
};
