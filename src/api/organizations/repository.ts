import { autoInjectable } from 'tsyringe';

import { Page } from '../../pagination';
import { repository, RepositoryBase } from '../../repository';

import { IOrganization } from './schema';

@autoInjectable()
@repository({
	table: 'organizations',
	columns: ['id', 'slug', 'name', 'created_at', 'updated_at', 'deleted_at']
})
export class Repository extends RepositoryBase {
	async findBySlug(slug: string): Promise<IOrganization | undefined> {
		return this.db.select(this.as()).from(this.table).where('slug', slug).first();
	}

	async find(page: Page): Promise<[number, IOrganization[]]> {
		const query = this.db.table(this.table).where('name', 'ilike', `%${page.filter}%`).andWhere('deleted_at', null);

		const [total, orgs] = await Promise.all([
			query.clone().count().first<{ count: string }>(),
			query.clone().select<IOrganization[]>(this.as()).orderBy(page.order).offset(page.skip).limit(page.perPage)
		]);

		return [+total.count, orgs];
	}
}
