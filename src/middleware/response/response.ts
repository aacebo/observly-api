import { Next } from 'koa';
import qs from 'qs';

import { PaginationContext } from '../../pagination';

import { IResponse } from './interface';

export function response(): (ctx: PaginationContext, next: Next) => Promise<void> {
	return async function (ctx: PaginationContext, next: Next): Promise<void> {
		if (!ctx.body) return;

		let links: { [key: string]: string | null } | null = null;
		let meta: { [key: string]: string | number } | null = null;

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
				next: nxt ? `${url}?${nxt}` : null,
				prev: prev ? `${url}?${prev}` : null
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
