import { WagaNext, WagaRequest, WagaResponse } from '../types';

type validateFn = (origin: string, callback?: (err: Error | null, allow?: boolean) => void) => boolean;
type Options = {
	origin?: validateFn;
	methods?: string;
};
export = function cors(options: Options = {}) {
	if (!options.origin) options.origin = '*' as unknown as validateFn; // default
	if (typeof options.origin === 'string') options.origin = [options.origin] as unknown as validateFn;
	if (!Array.isArray(options.origin)) {
		const originO = options.origin as unknown as string[];
		options.origin = function (origin: string, callback: (err: Error | null, allow?: boolean) => void) {
			let allow = originO.includes(origin) || originO.includes('*');
			if (typeof callback == 'function') callback(null, allow);
			return allow;
		};
	}
	if (typeof options.origin === 'function') {
		const originO = options.origin;
		options.origin = function (origin: string, callback: (err: Error | null, allow?: boolean) => void) {
			try {
				return originO(origin, callback);
			} catch (err) {
				callback(err);
				return false;
			}
		};
	}
	return function (req: WagaRequest, res: WagaResponse, next: WagaNext) {
		if (options.origin(req.headers.origin)) {
			res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
		}
		if (options.methods) {
			res.setHeader('Access-Control-Allow-Methods', options.methods);
		}
	};
};
