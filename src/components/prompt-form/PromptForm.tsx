import { useEffect, useRef } from 'react';
import { Divider } from './Divider';
import { PromptErrors } from './PromptErrors';
import { SocialConnections } from './SocialConnections';
import { Spinner } from './Spinner';
import { Text } from 'components';
import { isLoading, isOmni, prompt, pwd, state } from 'signals';

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
		<section className='widget'>
			<div className='form-container'>
				<div style={{ display: isLoading.value ? 'none' : undefined }}>
					<header>
						<div className='logo' />
						<h1 className='text-center text-2xl mb-4' style={{ marginTop: '24px' }}>
							{title}
						</h1>
						{description && (
							<div>
								<Text className='text-center'>{description}</Text>
							</div>
						)}
						<input type='hidden' name='state' value={state.value} />
					</header>
					<form
						{...{
							ref: formRef,
							onSubmit,
							method: !!onSubmit ? undefined : 'POST',
							...attributes,
						}}
					>
						<PromptErrors className='mb-4' />
						{/* If social_buttons_layout is top it could re-order these via HTML instead of css (in ULP) */}
						{children}
						{(alternateAction || includeSocialConnections) && <Divider text='Or' />}
						{alternateAction}
						{includeSocialConnections && <SocialConnections />}
					</form>
				</div>
				{isLoading.value && <Spinner />}
			</div>
		</section>
	);
};
