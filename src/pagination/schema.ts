import Joi from 'joi';

import { Page } from './page';

export const schema = Joi.object<Page>().keys({
	page: Joi.number().integer().min(1).default(1),
	perPage: Joi.number().integer().min(5).default(10),
	sort: Joi.string().default(''),
	filter: Joi.string().default('')
});
