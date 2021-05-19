import { mock } from '../../src/api/organizations';

export const organizations = {
	google: mock({
		id: '3751ccf4-4055-4597-bed8-0697bad7976e',
		key: 'e16b7cf8-4f8e-469b-8c65-a541e5aa0dbe',
		slug: 'google',
		name: 'Google'
	}),
	facebook: mock({
		id: 'a6d922ad-5736-454b-81f5-a4037ce4706a',
		key: '5d524857-816d-4be7-97e5-e9036e105e36',
		slug: 'facebook',
		name: 'Facebook'
	}),
	apple: mock({
		id: '4870f6a7-31ad-4733-a416-b2c12939690f',
		key: '268e176b-a02c-40d8-8d08-4cff2f167aa2',
		slug: 'apple',
		name: 'Apple'
	})
};
