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
    sendFile(path: string): void;
    send(data: string): void;
    json(data: object): void;
    status(code: number | string): AgaResponse;
    location(url: string): AgaResponse;
    redirect(url: string): AgaResponse;
    format(data: object): AgaResponse;
}
export type AgaNext = () => void;
export type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'USE';
export type AgaHandlerCallback = (req: AgaRequest, res: AgaResponse, next: AgaNext) => void;
export type AgaHandler = {
    [key: string]: AgaHandlerCallback[];
};
