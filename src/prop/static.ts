import { isDirectory, isFile } from '@agacraft/fs';
import { WagaNext, WagaRequest, WagaResponse } from '../types';
import fileType from '../utils/fileType';

export = function (path: string) {
	return function (req: WagaRequest, res: WagaResponse, next: WagaNext) {
		const route = `${path}/${req.static}`;
		if (isFile(route)) res.setHeader('Content-Type', fileType(route)).sendFile(route);
		else if (isFile(`${route}.html`)) res.sendFile(`${route}.html`);
		else if (isDirectory(route) && isFile(`${route}/index.html`)) res.sendFile(`${route}/index.html`);
		else next();
	};
};
