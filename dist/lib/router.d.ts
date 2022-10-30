import * as types from '../types';
declare class Router {
    #private;
    get METHODS(): {
        GET: types.AgaHandler;
        POST: types.AgaHandler;
        PUT: types.AgaHandler;
        DELETE: types.AgaHandler;
        USE: types.AgaHandler;
    };
    get(path: string, ...callback: types.AgaHandlerCallback[]): this;
    put(path: string, ...callback: types.AgaHandlerCallback[]): this;
    post(path: string, ...callback: types.AgaHandlerCallback[]): this;
    delete(path: string, ...callback: types.AgaHandlerCallback[]): this;
    use(path: string | types.AgaHandlerCallback | Router, ...callback: types.AgaHandlerCallback[] | Router[]): this;
}
export = Router;
