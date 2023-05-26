import fs from 'fs'
import { isFile } from '@agacraft/fs';
import { WagaNext, WagaRequest, WagaResponse } from '../types';
import { redirect } from '..';
import fileType from '../utils/fileType';

export = function betterResponse(request: WagaRequest, response: WagaResponse, next: WagaNext) {
	response.contentType = (type: string) => response.setHeader('Content-Type', type);
	response.type = (type: string) => response.contentType(fileType(type));
	response.send = data => {
		if (typeof data === 'string' || data instanceof Buffer) return response.end(data);
		response.json(data);
	};
	response.json = data => {
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify(data));
	};
	response.sendFile = path => {
		if (isFile(path)) {
			const type = this.getTypeFile(path);
			response.setHeader('Content-Type', type);
			response.end(fs.readFileSync(path));
		} else next();
	};
	response.status = code => {
		response.statusCode = +code;
		return response;
	};
	response.location = function location(url) {
		return response.setHeader('Location', url);
	};
	response.redirect = (url: string) => redirect(url)(request, response, next);
}
