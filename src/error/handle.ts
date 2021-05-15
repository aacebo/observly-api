import { Next, ParameterizedContext } from 'koa';
import debug from 'debug';

export function handle(): (ctx: ParameterizedContext, next: Next) => Promise<void> {
	const log = debug('observly-api:request:error');

	return async function (ctx: ParameterizedContext, next: Next): Promise<void> {
		try {
			await next();
		} catch (err) {
			ctx.status = err.statusCode || err.status || 500;
			ctx.body = { message: err.message };

			if (ctx.status >= 500) {
				log(err);
			}
		}
	};
}
