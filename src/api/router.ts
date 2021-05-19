import Koa from 'koa';
import bodyparser from 'koa-bodyparser';

import * as middleware from '../middleware';
import * as error from '../error';

import * as organizations from './organizations';

export function router(): Koa {
	const r = new Koa();

	r.use(bodyparser());
	r.use(middleware.logger());
	r.use(error.handle());

	r.use(organizations.router.allowedMethods());
	r.use(organizations.router.routes());

	r.use(middleware.response());

	return r;
}
