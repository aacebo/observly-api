import Joi from 'joi';

import * as validation from '../../../../validation';

export interface ICreateOrganization {
	readonly slug: string;
	readonly name: string;
}

export const createOrganizationSchema = Joi.object<ICreateOrganization>().keys({
	slug: Joi.string().regex(validation.regex.slug).required(),
	name: Joi.string().required()
});
