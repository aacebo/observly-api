export interface IOrganization {
	readonly id: string;
	readonly key: string;
	slug: string;
	name: string;
	readonly createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
