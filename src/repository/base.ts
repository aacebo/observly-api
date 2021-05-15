import { Knex, knex } from 'knex';
import camelcase from 'camelcase';

import knexfile from '../../knexfile';

import { IRepositoryOptions } from './options';

export class RepositoryBase implements IRepositoryOptions {
	readonly table: string = '';
	readonly columns: string[] = [];
	readonly db: Knex = knex(knexfile.local);

	as(alias = this.table): { [c: string]: string } {
		const c: { [c: string]: string } = {};

		for (const col of this.columns) {
			c[camelcase(col)] = `${alias}.${col}`;
		}

		return c;
	}
}
