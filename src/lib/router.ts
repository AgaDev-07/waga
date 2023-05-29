import { METHODS } from '../consts';
import { WagaHandler, WagaHandlerCallback, ValidMethods } from '../types';
import { InvalidElement, InvalidMethod } from '../utils/Errors';
import { isIterableWith, isWagaHandlerCallback } from '../utils/validateType';
import { clearPath } from './betterRequest';
import validatePath from './validatePath';

type methodRouter = Router | WagaHandlerCallback;
function isMethodRouter(obj: any): obj is methodRouter {
	return obj instanceof Router || isWagaHandlerCallback(obj);
}

class Router {
	#methods: Record<ValidMethods, WagaHandler[]> = {
		GET: [],
		POST: [],
		PUT: [],
		DELETE: [],
		USE: [],
	};
	#routers: [string, Router][] = [];
	get _methods() {
		return this.#methods;
	}
	__active__() {
		const useRouters = Boolean(this.#routers.length);

		// An external function is used so that the function does not have to be re-created each time the method is called
		if (useRouters)
			for (const [path, router] of this.#routers) {
				const routerMethods = router.__active__();
				for (const method in routerMethods) {
					const routerHandlers = routerMethods[method as ValidMethods];
					for (const routerHandler of routerHandlers) {
						const _path = clearPath(`${path === '*' ? '' : path}${routerHandler.path}`)
						const handler = this.#methods[method as ValidMethods].find(handler => handler.path === _path);
						if (!handler)
							this.#methods[method as ValidMethods].unshift({
								path: _path,
								validate: validatePath(_path),
								value: routerHandler.value,
								length: _path.split('/').length,
							});
						else handler.value.unshift(...routerHandler.value);
					}
				}
			}
		return this.#methods;
	}
	_setMethod(method: ValidMethods, path: string, handlerCallback: WagaHandlerCallback[]) {
		if (!METHODS.includes(method)) throw new InvalidMethod(`"${method}" is not a valid method`);
		if (typeof path !== 'string') throw new TypeError(`"path" must be a string`);
		if (!isIterableWith(handlerCallback, isWagaHandlerCallback)) throw new InvalidElement(`"handlerCallback" must be a array of WagaHandlerCallback`);

		const _path = clearPath(path);
		const handler = this.#methods[method].find(handler => handler.path === _path);
		if (!handler)
			this.#methods[method].unshift({
				path: _path,
				validate: validatePath(_path),
				value: handlerCallback,
				length: _path.split('/').length,
			});
		else handler.value.unshift(...handlerCallback);
	}
	get(path: string, ...handlerCallback: WagaHandlerCallback[]) {
		this._setMethod('GET', path, handlerCallback);
		return this;
	}
	post(path: string, ...handlerCallback: WagaHandlerCallback[]) {
		this._setMethod('POST', path, handlerCallback);
		return this;
	}
	put(path: string, ...handlerCallback: WagaHandlerCallback[]) {
		this._setMethod('PUT', path, handlerCallback);
		return this;
	}
	delete(path: string, ...handlerCallback: WagaHandlerCallback[]) {
		this._setMethod('DELETE', path, handlerCallback);
		return this;
	}
	use(...handlerCallback: methodRouter[]): this;
	use(path: string, ...handlerCallback: methodRouter[]): this;
	use() {
		let [path, ...handlerCallback] = [...arguments];
		if (typeof path !== 'string')
			if (isMethodRouter(path)) {
				handlerCallback.unshift(path as methodRouter);
				path = '*';
			} else throw new TypeError(`"path" must be a string, Router or WagaHandlerCallback`);
		if (!isIterableWith(handlerCallback, isMethodRouter)) throw new InvalidElement(`"handlerCallback" must be a array of WagaHandlerCallback or Router`);
		for (const handler of handlerCallback) {
			if (handler instanceof Router) this.#routers.push([path, handler]);
			else this._setMethod('USE', path, [handler]);
		}
		return this;
	}
}

export = Router;
