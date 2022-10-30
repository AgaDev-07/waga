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
            this.#METHODS.GET = { ...this.#METHODS.GET, ...path.METHODS.GET };
            this.#METHODS.PUT = { ...this.#METHODS.PUT, ...path.METHODS.PUT };
            this.#METHODS.POST = { ...this.#METHODS.POST, ...path.METHODS.POST };
            this.#METHODS.DELETE = { ...this.#METHODS.DELETE, ...path.METHODS.DELETE };
            this.#METHODS.USE['*'] = [...this.#METHODS.USE['*'], ...path.METHODS.USE['*']];
        }
        else if (typeof path === 'string') {
            callback.forEach((cb) => {
                if (typeof cb === 'function') {
                    this.#METHODS.USE[betterURL_1.default.clearPath(path)] ||= [];
                    this.#METHODS.USE[betterURL_1.default.clearPath(path)].push(cb);
                }
                if (typeof cb === 'object') {
                    const PATH = betterURL_1.default.clearPath(path);
                    this.#METHODS.GET[PATH] ||= [];
                    this.#METHODS.PUT[PATH] ||= [];
                    this.#METHODS.USE[PATH] ||= [];
                    this.#METHODS.POST[PATH] ||= [];
                    this.#METHODS.DELETE[PATH] ||= [];
                    Object.keys(cb.METHODS.GET).filter(k => k !== '*').map(key => [PATH + key, key]).forEach(([path, key]) => {
                        this.#METHODS.GET[path] = cb.METHODS.GET[key];
                    });
                    Object.keys(cb.METHODS.PUT).filter(k => k !== '*').map(key => [PATH + key, key]).forEach(([path, key]) => {
                        this.#METHODS.PUT[path] = cb.METHODS.PUT[key];
                    });
                    Object.keys(cb.METHODS.POST).filter(k => k !== '*').map(key => [PATH + key, key]).forEach(([path, key]) => {
                        this.#METHODS.POST[path] = cb.METHODS.POST[key];
                    });
                    Object.keys(cb.METHODS.DELETE).filter(k => k !== '*').map(key => [PATH + key, key]).forEach(([path, key]) => {
                        this.#METHODS.DELETE[path] = cb.METHODS.DELETE[key];
                    });
                    Object.keys(cb.METHODS.USE).filter(k => k !== '*').map(key => [PATH + key, key]).forEach(([path, key]) => {
                        this.#METHODS.USE[path] = cb.METHODS.USE[key];
                    });
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
