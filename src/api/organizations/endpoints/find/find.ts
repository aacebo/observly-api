import { Next } from 'koa';

import { PaginationContext } from '../../../../pagination';
import { Repository } from '../../repository';

export function find(): (ctx: PaginationContext, next: Next) => Promise<void> {
	const repository = new Repository();

	return async function (ctx: PaginationContext, next: Next): Promise<void> {
		const [total, orgs] = await repository.find(ctx.page);

		ctx.total = total;
		ctx.body = orgs;

		await next();
	};
}
