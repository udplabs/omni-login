import { signal } from '@preact/signals-react';

import type { Signal } from '@preact/signals-react';

const defaultDelay = signal(10 * 1000);

export const poller = async <I, O>({
	fn,
	validator,
	interval = defaultDelay,
	args,
	maxAttempts,
	backoff = 0,
	controller,
	maxInterval,
	skipInitial = false,
}: PollerOptions<I, O>) => {
	let attempts = 0;

	const executePoll = async <R extends Function, r extends Function>(resolve: R, reject: r) => {
		if (!skipInitial) {
			const result = await fn(args);

			attempts++;

			interval.value += backoff;

			console.debug(`attempt count: ${attempts}`);
			console.debug('attempt result', { result });

			const success = await validator(result);

			if (success instanceof Error) {
				return reject(success);
			}

			if (success !== false) {
				return resolve(success);
			}
		}

		if (maxAttempts && maxAttempts > 0 && attempts === maxAttempts) {
			if (controller?.abort) {
				controller.abort();
			}

			return reject(new Error('Exceeded max attempts'));
		}

		if (maxInterval && interval.value >= maxInterval) {
			return reject(new Error('Maximum interval reached! Terminating...'));
		}

		skipInitial = false;

		setTimeout(executePoll, interval.value, resolve, reject);
	};

	return new Promise(executePoll) as Promise<O>;
};

export interface PollerOptions<I, O> {
	fn: Function;
	validator: ValidateFn<I, O>;
	interval?: Signal<number>;
	args?: { [key: string]: any };
	/**
	 * If set to `0` this will be an infinite poll!
	 */
	maxAttempts?: number;
	maxInterval?: number;
	backoff?: number;
	controller?: AbortController;
	/**
	 * If `true` the poller will now run immediately and will instead wait one interval first.
	 *
	 * This is useful if you need to run the function first in order to provide input to the poller.
	 */
	skipInitial?: boolean;
}

export type ValidateFn<I, O> = (response: I, error?: Error) => Promise<O | Error | false>;
