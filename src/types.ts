import http from 'http';
import { ValidatePathFn } from './lib/validatePath';

export type QueryValue = string | number | boolean | null;
export type Query = Record<string, QueryValue>;

export interface WagaRequest extends http.IncomingMessage {
  accepts: (type: string) => boolean;
	path: string;
	body: string;
	query: Query;
	params: Record<string, string>;
	static: string
}
export interface WagaResponse extends http.ServerResponse<http.IncomingMessage> {
	contentType: (type: string) => WagaResponse;
	type: (type: string) => WagaResponse;
	sendFile(path: string): void;
	send(data: string): void;
	send(data: Buffer): void;
	send(data: object): void;
	json(data: object): void;
	status(code: number | string): WagaResponse;
	location(url: string): WagaResponse;
	redirect(url: string): WagaResponse;
}
export type WagaNext = () => void;
export type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'USE';
export type WagaHandlerCallback = (req: WagaRequest, res: WagaResponse, next: WagaNext) => void;
export interface WagaHandler {
	static?: string;
	path: string;
	validate: ValidatePathFn;
	value: WagaHandlerCallback[];
	length: number;
}

export interface WagaValidMethod {
	params: Record<string, string>;
	fns: WagaHandler['value'];
	length: WagaHandler['length'];
	paramsKeys: number;
	static?: string;
}
