import { Knex } from 'knex';

import { objectToSnakeCase } from '../../src/utils/object-to-snake-case';
import { organizations } from '../static/organizations';

export async function seed(knex: Knex): Promise<void> {
	await knex.table('organizations').delete();
	await knex.table('organizations').insert(Object.values(organizations).map((v) => objectToSnakeCase(v)));
}
