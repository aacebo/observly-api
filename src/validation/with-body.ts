import { StatusCodes } from 'http-status-codes';
import { Next, ParameterizedContext } from 'koa';
import Joi from 'joi';

import { HttpError } from '../error';

export function withBody(schema: Joi.Schema): (ctx: ParameterizedContext, next: Next) => Promise<void> {
	return async function (ctx: ParameterizedContext, next: Next): Promise<void> {
		const res = schema.validate(ctx.body);

		if (res.error) {
			ctx.status = StatusCodes.BAD_REQUEST;
			ctx.body = new HttpError(StatusCodes.BAD_REQUEST, ...res.error.details.map((d) => d.message));
			return;
		}

		ctx.body = res.value;

		await next();
	};
}
