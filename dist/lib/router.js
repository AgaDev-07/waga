"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const betterURL_1 = __importDefault(require("../lib/betterURL"));
class Router {
    #METHODS = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {},
        USE: { '*': [] },
    };
    #routers = [];
    __active__() {
        const METHODS = this.#METHODS;
        this.#routers.forEach(([path, router]) => {
            const methods = router.__active__();
            Object.keys(methods).forEach(m => {
                let method = m;
                if (path === '*')
                    if (method === 'USE')
                        METHODS.USE['*'] = [...METHODS.USE['*'], ...methods[method]['*']];
                    else {
                        METHODS[method] = {
                            ...METHODS[method],
                            ...methods[method],
                        };
                    }
                else {
                    Object.keys(methods[method]).forEach(p => {
                        if (!methods[method][p][0])
                            return;
                        if (p === '*')
                            METHODS[method][path] = methods[method]['*'];
                        else
                            METHODS[method][betterURL_1.default.clearPath(path + p)] = methods[method][p];
                    });
                }
            });
        });
        this.#METHODS = METHODS;
        return this.#METHODS;
    }
    get METHODS() {
        return this.#METHODS;
    }
    get(path, ...callback) {
        this.#METHODS.GET[betterURL_1.default.clearPath(path)] = callback;
        return this;
    }
    put(path, ...callback) {
        this.#METHODS.PUT[betterURL_1.default.clearPath(path)] = callback;
        return this;
    }
    post(path, ...callback) {
        this.#METHODS.POST[betterURL_1.default.clearPath(path)] = callback;
        return this;
    }
    delete(path, ...callback) {
        this.#METHODS.DELETE[betterURL_1.default.clearPath(path)] = callback;
        return this;
    }
    use(path, ...callback) {
        if (typeof path === 'function') {
            this.#METHODS.USE['*'].push(path);
        }
        else if (typeof path === 'object') {
            this.#routers.push(['*', path]);
        }
        else if (typeof path === 'string') {
            callback.forEach(cb => {
                if (typeof cb === 'function') {
                    this.#METHODS.USE[betterURL_1.default.clearPath(path)] ||= [];
                    this.#METHODS.USE[betterURL_1.default.clearPath(path)].push(cb);
                }
                if (typeof cb === 'object') {
                    this.#routers.push([betterURL_1.default.clearPath(path), cb]);
                }
            });
        }
        else {
            throw new Error('Invalid argument type');
        }
        return this;
    }
}
module.exports = Router;
