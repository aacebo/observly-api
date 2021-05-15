import { DefaultContext, DefaultState, ParameterizedContext } from 'koa';

import { Page } from './page';

export type PaginationContext = ParameterizedContext<
	DefaultState,
	DefaultContext & {
		page: Page;
		total?: number;
	}
>;
