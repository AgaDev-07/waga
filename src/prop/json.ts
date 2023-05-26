import { WagaNext, WagaRequest, WagaResponse } from '../types';

export = function JsonBody(req: WagaRequest, res: WagaResponse, next: WagaNext) {
	try {
		req.body = JSON.parse(req.body);
	} catch (error) {
		req.body = {} as string;
	}
	next();
};
