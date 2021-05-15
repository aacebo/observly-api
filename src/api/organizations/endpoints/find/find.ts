import * as middleware from '../../../../middleware';
import { Repository } from '../../repository';

export function find(): (ctx: middleware.PaginationContext) => Promise<void> {
	const repository = new Repository();

	return async function (ctx: middleware.PaginationContext): Promise<void> {
		const [total, orgs] = await repository.find(ctx.page);

		ctx.total = total;
		ctx.body = orgs;
	};
}
