import { AgaHandler, AgaHandlerCallback, ValidMethods } from '../types';
type methodRouter = Router | AgaHandlerCallback;
declare class Router {
    #private;
    get METHODS(): Record<ValidMethods, AgaHandler>;
    __active__(): Record<ValidMethods, AgaHandler>;
    get(path: string, handler: AgaHandlerCallback): this;
    post(path: string, handler: AgaHandlerCallback): this;
    put(path: string, handler: AgaHandlerCallback): this;
    delete(path: string, handler: AgaHandlerCallback): this;
    use(handler: methodRouter, ...handlers: methodRouter[]): this;
    use(path: string, ...handlers: methodRouter[]): this;
}
export = Router;
