/// <reference types="node" />
import http from 'http';
import Router from './lib/router';
import { AgaRequest, AgaResponse } from './types';
declare class App extends Router {
    constructor();
    listen(port: number, callback?: (port?: number) => void): http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;
    toFunction(): (req: AgaRequest, res: AgaResponse) => Promise<void>;
}
declare function app(): App;
declare namespace app {
    export var json: () => (req: any, res: any, next: any) => void;
    var _a: (path: any) => (req: any, res: any, next: any) => void;
    export var cors: (options?: {
        origin?: (origin: string, callback?: (err: Error, allow?: boolean) => void) => boolean;
        methods?: string;
    }) => (req: any, res: any, next: any) => void;
    export var Router: () => Router;
    export { _a as static };
}
export = app;
