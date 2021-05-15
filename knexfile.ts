import dotenv from 'dotenv';

dotenv.config({ path: !process.env.NODE_ENV ? '.env' : `.env.${process.env.NODE_ENV}` });

const config = {
	client: 'postgresql',
	connection: {
		database: process.env.PG_DATABASE,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations',
		extension: 'ts',
		directory: `${__dirname}/database/migrations`
	},
	seeds: {
		directory: `${__dirname}/database/seeds`
	}
};

export = {
	local: config,
	test: config
};
