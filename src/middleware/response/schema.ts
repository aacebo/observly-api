export interface IResponseMeta {
	readonly total: number;
	readonly pages: number;
}

export interface IResponseLinks {
	readonly first: string;
	readonly last: string;
	readonly prev?: string;
	readonly next?: string;
}

export interface IResponse<T = any> {
	readonly meta?: IResponseMeta;
	readonly links?: IResponseLinks;
	readonly data: T;
}
