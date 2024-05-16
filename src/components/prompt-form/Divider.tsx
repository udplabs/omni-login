interface IDividerProps {
	text: string;
}

export const Divider = ({ text }: IDividerProps) => {
	return (
		<div
			className={[
				'flex',
				'flex-row',
				'items-center',
				'text-center',
				'uppercase',
				'text-xs',
				'text-gray-800',

				'before:border-b',
				'before:border-neutral-300',
				'before:grow',
				"before:content-[' ']",

				'after:border-b',
				'after:border-neutral-300',
				'after:grow',
				"after:content-[' ']",
				'divider',
			].join(' ')}
		>
			<span className='grow-[0.2]'>{text}</span>
		</div>
	);
};
