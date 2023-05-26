import http from 'http';

import Router from './lib/router';
import betterRequest from './lib/betterRequest';
import bodyParser from './lib/bodyParser';
import { ValidMethods, WagaRequest, WagaResponse, WagaValidMethod } from './types';
import cors from './prop/cors';
import _static from './prop/static';
import json from './prop/json';
import redirect from './prop/redirect';
import fileType from './utils/fileType';
import betterResponse from './lib/betterResponse';

const FN = () => {};
const html404 = ['<h1>404 Not Found</h1>', '<h3>Server: Waga</h3>', '<style>body{text-align: center;font-family: system-ui;}</style>'];
const e404 = (req: WagaRequest, res: WagaResponse) => {
	if (req.accepts('html')) {
		return res.status(404).send(`${html404[0]}<h2>${req.method} ${req.path}</h2>${html404[1]}${html404[2]}`);
	}
	if (req.accepts('json')) return res.status(404).send({ error: 'Not Found', method: req.method, url: req.url, status: 404, server: 'Waga' });
	return res.status(404).send('Not Found');
};

class App extends Router {
	constructor() {
		super();
	}
	#TypeFiles: Record<string, string> = {};
	getTypeFile(path: string) {
		const ext = path.split('.').pop()?.toLowerCase();
		return this.#TypeFiles[ext] || fileType(path);
	}
	setTypeFile(ext: string, type: string) {
		this.#TypeFiles[ext] = type;
		return this;
	}
	listen(port: number, callback: (port?: number) => void = FN) {
		if (typeof callback !== 'function') throw new TypeError('Callback must be a function');
		const fn = this.toFunction();
		const server = http.createServer(fn);
		server.listen(port, () => callback((server.address() as any).port as number));
		return server;
	}
	getValids(req: WagaRequest) {
		const method = req.method;
		const path = req.path;

		const USE: WagaValidMethod[] = [];

		for (const handler of this._methods.USE) {
			const params = handler.validate(path);
			if (!params) continue;
			USE.push({ params, fns: handler.value, length: handler.length, paramsKeys: Object.keys(params).length, static: handler.static || handler.path });
		}

		const METHOD: WagaValidMethod[] = [];

		for (const handler of this._methods[method as ValidMethods]) {
			const params = handler.validate(path);
			if (!params) continue;
			METHOD.push({ params, fns: handler.value, length: handler.length, paramsKeys: Object.keys(params).length, static: handler.static || handler.path });
		}
		const methodSort = METHOD.sort((a, b) => {
			if (a.params['*'] && !b.params['*']) return 1;
			if (!a.params['*'] && b.params['*']) return -1;
			if (a.length === b.length) return b.paramsKeys - a.paramsKeys;
			return b.length - a.length;
		});
		USE.push(...methodSort);

		return USE;
	}
	toFunction() {
		this.__active__();
		return async (request: WagaRequest, response: WagaResponse) => {
			request.body = await bodyParser(request, response);
			betterRequest(request, response, next);
			betterResponse(request, response, next);

			const valid = this.getValids(request);

			let i = 0;
			function next() {
				const element = valid[i];
				if (!element) return e404(request, response);
				const { fns, params, static: _static = '' } = element;
				i++;
				if (!fns) return;
				if (fns.length === 0) return next();

				const request_ = { ...request, params, static: _static } as WagaRequest;
				for (const fn of fns) fn(request_, response, next);
			}
			next();
		};
	}
}

function app() {
	return new App();
}
app.redirect = redirect;
app.json = json;
app.static = _static;
app.cors = cors;
app.Router = () => new Router();
export = app;
