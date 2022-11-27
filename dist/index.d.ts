/// <reference types="node" />
import http from 'http';
import * as types from './types';
import Router from './lib/router';
import webSocket from './lib/webSocket';
declare type AgaServer = http.Server & {
    port: () => number;
};
declare class App extends Router {
    #private;
    constructor(server: AgaServer);
    listen(port: number, callback: (port: number) => void): AgaServer;
}
declare function app(): App;
declare namespace app {
    export var json: () => (req: types.AgaRequest, res: types.AgaResponse, next: types.AgaNext) => void;
    var _a: (path: string) => (req: types.AgaRequest, res: types.AgaResponse, next: types.AgaNext) => void;
    export var cors: typeof import("./lib/cors");
    export var Router: () => Router;
    export var WebSocket: (server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => webSocket;
    export { _a as static };
}
export = app;
