export class HttpError {
	readonly status: number;
	readonly messages: string[];

	constructor(status: number, ...messages: string[]) {
		this.status = status;
		this.messages = messages;
	}
}
