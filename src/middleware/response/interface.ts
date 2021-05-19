export interface IResponseMeta {
	readonly total: number;
	readonly pages: number;
}

export interface IResponseLinks {
	readonly first: string;
	readonly last: string;
	readonly prev: string | null;
	readonly next: string | null;
}

export interface IResponse<T = any> {
	readonly meta: IResponseMeta | null;
	readonly links: IResponseLinks | null;
	readonly data: T;
}
