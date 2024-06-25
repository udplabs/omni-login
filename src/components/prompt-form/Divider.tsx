interface IDividerProps {
	text: string;
}

export const Divider = ({ text }: IDividerProps) => {
	return (
		<div className='_prompt-divider'>
			<span>{text}</span>
		</div>
	);
};
