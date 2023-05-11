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
    #setMethod(method, path, handlerCallback = []) {
        this.#METHODS[method][path] ||= [];
        this.#METHODS[method][path].push(...handlerCallback);
    }
    __active__() {
        this.#routers.forEach(([path, router]) => {
            const routerMethods = router.__active__();
            Object.keys(routerMethods).forEach((method) => {
                const routerHandlers = routerMethods[method];
                Object.keys(routerHandlers).forEach(routerPath => {
                    if (!routerMethods[method][routerPath][0])
                        return;
                    const finalPath = (0, betterURL_1.clearPath)(`${path}/${routerPath === '*' ? '' : routerPath}`);
                    this.#setMethod(method, finalPath, routerHandlers[finalPath]);
                });
            });
        });
        return this.#METHODS;
    }
    #registerHandler(method, path, handler) {
        const handlerCallback = (this.#METHODS[method][path] ||= []);
        handlerCallback.push(handler);
        return this;
    }
    get(path, ...handlers) {
        handlers.forEach(handler => this.#registerHandler('GET', path, handler));
        return this;
    }
    post(path, ...handlers) {
        handlers.forEach(handler => this.#registerHandler('POST', path, handler));
        return this;
    }
    put(path, ...handlers) {
        handlers.forEach(handler => this.#registerHandler('PUT', path, handler));
        return this;
    }
    delete(path, ...handlers) {
        handlers.forEach(handler => this.#registerHandler('DELETE', path, handler));
        return this;
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
