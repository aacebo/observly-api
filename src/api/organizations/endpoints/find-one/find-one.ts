import { ParameterizedContext } from 'koa';
import { StatusCodes } from 'http-status-codes';

import { Repository } from '../../repository';

export function findOne(): (ctx: ParameterizedContext) => Promise<void> {
	const repository = new Repository();

	return async function (ctx: ParameterizedContext): Promise<void> {
		const org = await repository.findBySlug(ctx.params.org_slug);

		if (!org) {
			ctx.throw(StatusCodes.NOT_FOUND);
		}

		ctx.body = org;
	};
}
