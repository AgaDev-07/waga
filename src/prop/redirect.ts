import escapeHTML from '../lib/escapeHTML';
import statuses from '../lib/statuses';
import { WagaNext, WagaRequest, WagaResponse } from '../types';

export = function (url: string) {
	return function (request: WagaRequest, response: WagaResponse, next: WagaNext) {
		if (request.url !== url) {
			let address = url;
			let body = '';
			let status = 302;
			address = response.location(address).getHeader('Location') as string;
			if (request.accepts('html')) {
				var u = escapeHTML(address);
				body = '<p>' + statuses.message[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
			} else if (request.accepts('txt')) {
				body = statuses.message[status] + '. Redirecting to ' + address;
			}
			response.status(status).setHeader('Content-Length', Buffer.byteLength(body));
			if (request.method === 'HEAD') {
				response.end();
			} else {
				response.end(body);
			}
			return response;
		}
		response.status(404).send('<h1>Redirected to the same page</h1>');
		return response;
	};
};
