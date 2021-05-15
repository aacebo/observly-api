import { mock } from '../../src/api/organizations';

export const organizations = {
	google: mock({
		id: '3751ccf4-4055-4597-bed8-0697bad7976e',
		slug: 'google',
		name: 'Google'
	}),
	facebook: mock({
		id: 'a6d922ad-5736-454b-81f5-a4037ce4706a',
		slug: 'facebook',
		name: 'Facebook'
	}),
	apple: mock({
		id: '4870f6a7-31ad-4733-a416-b2c12939690f',
		slug: 'apple',
		name: 'Apple'
	})
};
