import { Next, ParameterizedContext } from 'koa';
import debug from 'debug';

import { HttpError } from './http-error';

export function handle(): (ctx: ParameterizedContext, next: Next) => Promise<void> {
	const log = debug('observly-api:request:error');

	return async function (ctx: ParameterizedContext, next: Next): Promise<void> {
		try {
			await next();
		} catch (err) {
			const error = new HttpError(err.statusCode || err.status || 500, err.message);

			ctx.status = error.status;
			ctx.body = error;

			if (error.status >= 500) {
				log(err);
			}
		}
	};
}
