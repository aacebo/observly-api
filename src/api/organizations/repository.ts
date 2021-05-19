import { autoInjectable } from 'tsyringe';
import * as uuid from 'uuid';

import { Page } from '../../pagination';
import { repository, RepositoryBase } from '../../repository';
import { objectToSnakeCase } from '../../utils/object-to-snake-case';

import { ICreateOrganization, IFindOrganizationResponse } from './endpoints';
import { IOrganization } from './interface';

@autoInjectable()
@repository({
	table: 'organizations',
	columns: ['id', 'key', 'slug', 'name', 'created_at', 'updated_at', 'deleted_at']
})
export class Repository extends RepositoryBase {
	async findBySlug(slug: string): Promise<IOrganization | undefined> {
		return this.db.select(this.as()).from(this.table).where('slug', slug).first();
	}

	async find(page: Page): Promise<[number, IFindOrganizationResponse[]]> {
		const query = this.db.table(this.table).where('name', 'ilike', `%${page.filter}%`).andWhere('deleted_at', null);

		const [total, orgs] = await Promise.all([
			query.clone().count().first<{ count: string }>(),
			query
				.clone()
				.select<IFindOrganizationResponse[]>({
					slug: 'slug',
					name: 'name',
					createdAt: 'created_at',
					updatedAt: 'updated_at'
				})
				.orderBy(page.order)
				.offset(page.skip)
				.limit(page.perPage)
		]);

		return [+total.count, orgs];
	}

	async create(req: ICreateOrganization): Promise<IOrganization> {
		const org: IOrganization = {
			...req,
			id: uuid.v4(),
			key: uuid.v4(),
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null
		};

		await this.db.insert(objectToSnakeCase(org)).into(this.table);

		return org;
	}
}
