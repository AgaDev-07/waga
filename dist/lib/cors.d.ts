import * as types from '../types';
declare type CorsOptions = {
    origin?(origin: string): Boolean;
    methods?: string | string[];
};
declare function cors(options?: CorsOptions): (req: types.AgaRequest, res: types.AgaResponse, next: types.AgaNext) => void;
export = cors;
