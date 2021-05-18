import { Next } from 'koa';
import qs from 'qs';

import { PaginationContext } from '../../pagination';

import { IResponse } from './schema';

export function response(): (ctx: PaginationContext, next: Next) => Promise<void> {
	return async function (ctx: PaginationContext, next: Next): Promise<void> {
		if (!ctx.body) return;

		let links: { [key: string]: string | undefined } | undefined;
		let meta: { [key: string]: string | number } | undefined;

		if (ctx.total !== undefined) {
			const url = ctx.path;
			const pages = Math.ceil(ctx.total / ctx.page.perPage);
			const base = {
				perPage: ctx.page.perPage !== 10 ? ctx.page.perPage : undefined,
				filter: ctx.page.filter || undefined,
				sort: ctx.page.sort || undefined
			};

			const first = qs.stringify({
				page: 1,
				...base
			});

			const last = qs.stringify({
				page: pages,
				...base
			});

			const nxt =
				ctx.page.page < pages
					? qs.stringify({
							page: ctx.page.page + 1,
							...base
					  })
					: undefined;

			const prev =
				ctx.page.page > 1
					? qs.stringify({
							page: ctx.page.page - 1,
							...base
					  })
					: undefined;

			links = {
				first: `${url}?${first}`,
				last: `${url}?${last}`,
				next: nxt && `${url}?${nxt}`,
				prev: prev && `${url}?${prev}`
			};

			meta = {
				total: ctx.total,
				pages
			};
		}

		ctx.body = {
			meta,
			links,
			data: ctx.body
		} as IResponse;

		await next();
	};
}
