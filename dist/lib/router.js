"use strict";
const betterURL_1 = require("./betterURL");
class Router {
    #METHODS = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {},
        USE: { '*': [] },
    };
    #routers = [];
    get METHODS() {
        return this.#METHODS;
    }
    #setMethod(method, path, handlerCallback) {
        this.#METHODS[method][path] ||= [];
        this.#METHODS[method][path].push(...handlerCallback);
    }
    __active__() {
        const METHODS = this.METHODS;
        this.#routers.forEach(([path, router]) => {
            const routerMethods = router.__active__();
            Object.keys(routerMethods).forEach((method) => {
                if (path === '*')
                    this.#setMethod(method, path, routerMethods[method][path]);
                else {
                    const routerHandlers = routerMethods[method];
                    Object.keys(routerHandlers).forEach(routerPath => {
                        if (!routerMethods[method][routerPath][0])
                            return;
                        const finalPath = (0, betterURL_1.clearPath)(`${path}/${routerPath}`);
                        this.#setMethod(method, finalPath, routerHandlers[routerPath]);
                    });
                }
            });
        });
        this.#METHODS = METHODS;
        return this.#METHODS;
    }
    #registerHandler(method, path, handler) {
        const handlerCallback = (this.#METHODS[method][path] ||= []);
        handlerCallback.push(handler);
        return this;
    }
    get(path, handler) {
        return this.#registerHandler('GET', path, handler);
    }
    post(path, handler) {
        return this.#registerHandler('POST', path, handler);
    }
    put(path, handler) {
        return this.#registerHandler('PUT', path, handler);
    }
    delete(path, handler) {
        return this.#registerHandler('DELETE', path, handler);
    }
    use(path, ...handlers) {
        if (typeof path === 'function' || typeof path === 'object') {
            handlers.unshift(path);
            path = '*';
        }
        handlers.forEach(handler => {
            if (typeof handler === 'function')
                this.#registerHandler('USE', path, handler);
            else if (handler instanceof Router)
                this.#routers.push([path, handler]);
            else
                throw new TypeError(`Invalid handler: ${handler}`);
        });
        return this;
    }
}
module.exports = Router;
