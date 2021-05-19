import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	const exists = await knex.schema.hasTable('organizations');

	if (!exists) {
		return knex.schema.createTable('organizations', (t) => {
			t.uuid('id').primary();
			t.uuid('key').notNullable().unique().index();
			t.string('slug').notNullable().unique().index();
			t.string('name').notNullable().index();
			t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
			t.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
			t.timestamp('deleted_at');
		});
	}
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists('organizations');
}
