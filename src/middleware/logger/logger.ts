import { Next, ParameterizedContext } from 'koa';
import { formatDistanceToNow } from 'date-fns';
import debug from 'debug';
import chalk from 'chalk';

export function logger(): (ctx: ParameterizedContext, next: Next) => Promise<void> {
	const log = debug('observly-api:request');
	const colors = {
		success: chalk.bgGreen.black,
		warn: chalk.bgHex('#ff8c00').black,
		error: chalk.bgRed.black
	};

	return async function (ctx: ParameterizedContext, next: Next): Promise<void> {
		let status: string;
		const start = new Date();

		await next();

		if (ctx.status < 400) {
			status = colors.success(` ${ctx.status} `);
		} else if (ctx.status >= 400 && ctx.status < 500) {
			status = colors.warn(` ${ctx.status} `);
		} else {
			status = colors.error(` ${ctx.status} `);
		}

		log(`|${status}| ${formatDistanceToNow(start, { includeSeconds: true })} | ${ctx.method} ${ctx.path}`);
	};
}
