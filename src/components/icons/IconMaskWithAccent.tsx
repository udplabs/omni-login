export interface IIconMaskWithAccentProps {
	className?: string;
	mask: string;
	accent?: string;
}

export const IconMaskWithAccent = ({ mask, className, accent }: IIconMaskWithAccentProps) => {
	return (
		<span
			className={[
				'inline-block',
				'w-[40px]',
				'h-[40px]',
				accent ? 'bg-stone-300' : 'bg-gray-500',

				className ?? '',
			].join(' ')}
			style={{
				maskImage: `url("${mask}")`,
			}}
		>
			{accent && (
				<span
					className={[
						'absolute',
						'bg-gray-500',
						'inset-x-0', // `insert-0` is not supported by ie11
						'inset-y-0',
						'z-10',
					].join(' ')}
					style={{
						maskImage: `url("${accent}")`,
					}}
				></span>
			)}
		</span>
	);
};
