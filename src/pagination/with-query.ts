import { StatusCodes } from 'http-status-codes';
import { Next } from 'koa';

import { PaginationContext } from './context';
import { Page } from './page';
import { schema } from './schema';

export function withQuery(...columns: string[]): (ctx: PaginationContext, next: Next) => Promise<void> {
	const sortables = new Set<string>();

	for (const col of columns) {
		sortables.add(col);
		sortables.add(`-${col}`);
	}

	return async function (ctx: PaginationContext, next: Next): Promise<void> {
		const res = schema.validate(ctx.query, {
			allowUnknown: false,
			abortEarly: false
		});

		console.log(res.error);

		if (res.error) {
			ctx.status = StatusCodes.BAD_REQUEST;
			ctx.body = res.error.details.map((d) => d.message);
			return;
		}

		const sort = (res.value.sort as string).split(',').filter((s) => !!s);

		for (const s of sort) {
			if (!sortables.has(s)) {
				ctx.status = StatusCodes.BAD_REQUEST;
				return;
			}
		}

		ctx.page = new Page({
			...res.value,
			sort
		});

		await next();
	};
}
