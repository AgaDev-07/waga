import { AgaHandler, AgaHandlerCallback, ValidMethods } from '../types';
type methodRouter = Router | AgaHandlerCallback;
declare class Router {
    #private;
    get METHODS(): Record<ValidMethods, AgaHandler>;
    __active__(): Record<ValidMethods, AgaHandler>;
    get(path: string, ...handlers: AgaHandlerCallback[]): this;
    post(path: string, ...handlers: AgaHandlerCallback[]): this;
    put(path: string, ...handlers: AgaHandlerCallback[]): this;
    delete(path: string, ...handlers: AgaHandlerCallback[]): this;
    use(handler: methodRouter, ...handlers: methodRouter[]): this;
    use(path: string, ...handlers: methodRouter[]): this;
}
export = Router;
