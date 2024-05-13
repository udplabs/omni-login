import alert from 'assets/alert.svg';

interface IFieldErrorProps {
	error: UL.Error;
}

export const FieldError = ({ error }: IFieldErrorProps) => {
	return (
		<p className='mb-2 text-red-600 text-xs flex -mt-1 error'>
			<img src={alert} className='mr-2' /> {error.message}
		</p>
	);
};
