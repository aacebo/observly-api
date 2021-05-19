import { Next, ParameterizedContext } from 'koa';

import { Repository } from '../../repository';

export function create(): (ctx: ParameterizedContext, next: Next) => Promise<void> {
	const repository = new Repository();

	return async function (ctx: ParameterizedContext, next: Next): Promise<void> {
		const org = await repository.create(ctx.request.body);

		ctx.body = org;

		await next();
	};
}
