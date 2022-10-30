/// <reference types="node" />
import http from 'http';
export interface AgaRequest extends http.IncomingMessage {
    body: string;
    query: {
        [key: string]: string;
    };
    path: string;
    pathArray: string[];
    _path: string;
    params: {
        [key: string]: string;
    };
    static: string;
}
export interface AgaResponse extends http.ServerResponse<http.IncomingMessage> {
    send(data: string): void;
    json(data: object): void;
    status(code: number): AgaResponse;
}
export declare type AgaNext = () => void;
export declare type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare type AgaHandlerCallback = (req: AgaRequest, res: AgaResponse, next: AgaNext) => void;
export declare type AgaHandler = {
    [key: string]: AgaHandlerCallback[];
};
