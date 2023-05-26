import { WagaRequest, Query, QueryValue, WagaResponse, WagaNext } from '../types';
import { extToContentType } from '../utils/fileType';

function toValue(data: string): QueryValue {
	if (/^-?\d+(\.\d+)?$/.test(data)) return Number(data);
	if (data === 'true') return true;
	if (data === 'false') return false;
	if (data === 'null') return null;
	return data;
}
function queryToObject(queryString: string) {
	if (!queryString) return null;
	const query: [string, QueryValue][] = queryString.split('&').map(e => {
		const [key, value] = e.split('=');
		return [key, toValue(value)];
	});
	return Object.fromEntries(query) as Query;
}
function objectToQuery(obj: object) {
	return Object.entries(obj)
		.map(([key, value]) => `${key}=${value}`)
		.join('&');
}
function clearPath(path: string) {
	const newpath = path.split(/\//g).filter(Boolean).join('/').replace(/\/$/, '');
	const value = newpath === '*' ? newpath : `/${newpath}`;
	return value;
}

function isContentType(type: string) {
	return !!type.match(/^(.*)\/(.*)$/);
}

function betterRequest(req: WagaRequest, res: WagaResponse, next: WagaNext) {
	const { url = '/' } = req;
	const [path, query = ''] = url.split('?');
	req.query = queryToObject(query);
	req.path = clearPath(path);
	req.url = req.path + (query ? '?' + objectToQuery(req.query) : '');
	req.accepts = (type: string) => {
		const accept = req.headers['accept'] || '*/*';
		if (accept.includes('*/*')) return true;
		const accepts = accept.split(/,\s*/g);
    if (isContentType(type)) return accepts.includes(type);
    else return accepts.includes(extToContentType(type));
	};
}
betterRequest.clearPath = clearPath;

export = betterRequest;
