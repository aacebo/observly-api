export class Page {
	readonly page: number;
	readonly perPage: number;
	readonly sort: Set<string>;
	readonly filter: string;

	get skip(): number {
		return (this.page - 1) * this.perPage;
	}

	get order(): { column: string; order: 'ASC' | 'DESC' }[] {
		const o: { column: string; order: 'ASC' | 'DESC' }[] = [];

		for (const item of this.sort) {
			let order: 'ASC' | 'DESC' = 'ASC';
			let column = item;

			if (item.charAt(0) === '-') {
				order = 'DESC';
				column = item.slice(1);
			}

			o.push({ column, order });
		}

		return o;
	}

	constructor(args?: { page: number; perPage: number; sort: string[]; filter: string }) {
		this.page = args?.page || 1;
		this.perPage = args?.perPage || 10;
		this.sort = new Set<string>(args?.sort || []);
		this.filter = args?.filter || '';
	}
}
