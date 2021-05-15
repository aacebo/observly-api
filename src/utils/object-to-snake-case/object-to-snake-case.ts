import { snakeCase } from 'snake-case';

export function objectToSnakeCase<T = any, R = any>(o: T): R {
	const ret: any = {};

	for (const k in o) {
		ret[snakeCase(k)] = o[k];
	}

	return ret;
}
