import { AgaRequest } from "../types";
declare function betterURL(req: AgaRequest, paths: string[][]): void;
declare namespace betterURL {
    var clearPath: (path: string) => string;
}
export = betterURL;
