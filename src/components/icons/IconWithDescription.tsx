import { IconMaskWithAccent, Text } from 'components';

interface IIconWithDescriptionProps {
	mask: string;
	accent?: string;
	title: string;
	description: string;
}

export const IconWithDescription = ({ mask, accent, title, description }: IIconWithDescriptionProps) => {
	return (
		<Text className='pl-12'>
			<IconMaskWithAccent className='absolute top-0 left-0' mask={mask} accent={accent} />
			<strong>{title}</strong>
			<br />
			{description}
		</Text>
	);
};
