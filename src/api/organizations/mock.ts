import faker from 'faker';
import slugify from 'slugify';
import * as uuid from 'uuid';

import { IOrganization } from './schema';

export function mock(args?: Partial<IOrganization>): IOrganization {
	const name = faker.company.companyName();

	return {
		id: uuid.v4(),
		slug: slugify(name, '_'),
		name,
		createdAt: new Date(),
		updatedAt: new Date(),
		deletedAt: null,
		...args
	};
}
