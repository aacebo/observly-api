import { Knex, knex } from 'knex';
import debug from 'debug';

import knexfile from '../../knexfile';

import { IRepositoryOptions } from './options';

export function repository(options: IRepositoryOptions): any {
	const log = debug(`observly-api:${options.table}:repository`);

	return function <T extends { new (...args: any[]): {} }>(constructor: T): any {
		log('registered...');

		return class extends constructor {
			readonly table = options.table;
			readonly columns = options.columns;
			readonly db: Knex = knex(knexfile[process.env.NODE_ENV || 'local']);
		};
	};
}
