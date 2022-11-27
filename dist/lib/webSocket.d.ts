/// <reference types="node" />
/// <reference types="node" />
import http from 'http';
import internal from 'stream';
interface events {
    connection: (socket: internal.Duplex) => void;
    disconnect: (socket: internal.Duplex) => void;
    [key: string]: Function;
}
declare class AgaWebSocket {
    #private;
    constructor(server: http.Server);
    addEventListener<E extends keyof events>(event: E, callback: events[E]): void;
    on<E extends keyof events>(event: E, callback: events[E]): void;
    emit(event: string, ...data: any[]): void;
}
export = AgaWebSocket;
