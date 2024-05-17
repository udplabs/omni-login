import { computed } from '@preact/signals-react';
import { pwd } from 'signals';

const hasCharacterLength = computed(() => (pwd.value && pwd.value?.length >= 8 ? 'checked' : ''));
const hasLowercase = computed(() => (/[a-z]/.test(pwd.value ?? '') ? 'checked' : ''));
const hasUppercase = computed(() => (/[A-Z]/.test(pwd.value ?? '') ? 'checked' : ''));
const hasNumbers = computed(() => (/[0-9]/.test(pwd.value ?? '') ? 'checked' : ''));
const hasSpecial = computed(() => (/[!@#$%^&*]/.test(pwd.value ?? '') ? 'checked' : ''));
const minReq = computed(() => {
	let count = 0;

	if (hasLowercase.value) {
		count++;
	}
	if (hasUppercase.value) {
		count++;
	}
	if (hasNumbers.value) {
		count++;
	}
	if (hasSpecial.value) {
		count++;
	}

	return count >= 3 ? 'checked' : '';
});

export const PasswordComplexity = () => {
	if (pwd.value) {
		return (
			<div className='password-complexity'>
				<div>
					<ul>
						<li>
							Your password must contain:
							<ul>
								<li className={hasCharacterLength.value}>
									<span>At least 8 characters</span>
								</li>
								<li className={minReq.value}>
									<span>At least 3 of the following:</span>
									<ul>
										<li className={hasLowercase.value}>
											<span>Lowercase letters (a-Z)</span>
										</li>
										<li className={hasUppercase.value}>
											<span>Uppercase letters (a-Z)</span>
										</li>
										<li className={hasNumbers.value}>
											<span>Numbers (0-9)</span>
										</li>
										<li className={hasSpecial.value}>
											<span>Special characters (e.g. !@#$%^&*)</span>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		);
	}

	return <></>;
};
