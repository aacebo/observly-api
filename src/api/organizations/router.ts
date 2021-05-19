import Router from '@koa/router';

import * as pagination from '../../pagination';
import * as validation from '../../validation';

import * as endpoints from './endpoints';

export const router = new Router({ prefix: '/organizations' })
	.get('/', pagination.withQuery('name'), endpoints.find())
	.get('/:org_slug', endpoints.findOne())
	.post('/', validation.withBody(endpoints.createOrganizationSchema), endpoints.create());
