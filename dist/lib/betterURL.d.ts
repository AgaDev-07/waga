import * as types from '../types';
declare function betterURL(req: types.AgaRequest, paths: string[][]): void;
declare namespace betterURL {
    var clearPath: (path: string) => string;
}
export default betterURL;
