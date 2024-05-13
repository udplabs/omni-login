import { useEffect, useRef } from 'react';
import { Divider } from './Divider';
import { PromptErrors } from './PromptErrors';
import { SocialConnections } from './SocialConnections';
import { Text } from 'components';
import { SOCIAL_CONNECTIONS } from 'constants';
import { isOmni, prompt, pwd, state } from 'signals';

interface IPromptFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
	title: string;
	description?: string;
	includeSocialConnections?: boolean;
	alternateAction?: JSX.Element | null;
}

export const PromptForm = ({
	children,
	title,
	description,
	includeSocialConnections,
	alternateAction,
	onSubmit,
	...attributes
}: React.PropsWithChildren<IPromptFormProps>) => {
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		if (isOmni.value && !!pwd.value && (prompt.value as UL.ScreenPrompt) === 'login-password' && !!formRef.current) {
			formRef.current.submit();
		}
	}, []);

	return (
		<form
			{...{
				ref: formRef,
				className: [
					'px-10',
					'pt-10',
					'pb-6',
					'w-[400px]',

					'border-0',
					'rounded-[5px]',
					'shadow-[0_12px_40px_rgba(0,0,0,0.12)]',

					'bg-white',

					'min-h-[540px]',

					'flex',
					'flex-col',
					'justify-center',

					'ulp-mobile:w-full',
					'ulp-wide-mobile:justify-normal',
					'ulp-wide-mobile:min-h-full',
				].join(' '),
				onSubmit,
				method: !!onSubmit ? undefined : 'POST',
				...attributes,
			}}
		>
			<input type='hidden' name='state' value={state.value} />
			<div className='logo' />
			<h1 className='text-center text-2xl mb-4' style={{ marginTop: '24px' }}>
				{title}
			</h1>
			{description && <Text className='text-center'>{description}</Text>}
			<PromptErrors className='mb-4' />
			{/* If social_buttons_layout is top it could re-order these via HTML instead of css (in ULP) */}
			{children}
			{(alternateAction || (includeSocialConnections && SOCIAL_CONNECTIONS.length)) && <Divider text='Or' />}
			{alternateAction}
			{includeSocialConnections && <SocialConnections />}
		</form>
	);
};
