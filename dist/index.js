"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = __importDefault(require("@agacraft/fs"));
const router_1 = __importDefault(require("./lib/router"));
const betterURL_1 = __importDefault(require("./lib/betterURL"));
const bodyParser_1 = __importDefault(require("./lib/bodyParser"));
const cors_1 = __importDefault(require("./prop/cors"));
const static_1 = __importDefault(require("./prop/static"));
const json_1 = __importDefault(require("./prop/json"));
const redirect_1 = __importDefault(require("./prop/redirect"));
const fileType_1 = __importDefault(require("./lib/fileType"));
function toString(data) {
    if (typeof data === 'string')
        return data;
    if (data instanceof Buffer)
        return data.toString();
    if (data instanceof Object)
        return JSON.stringify(data);
    return `${data}`;
}
const FN = () => { };
class App extends router_1.default {
    constructor() {
        super();
        this.get('*', (req, res) => {
            res.status(404).send('404 Not Found');
        });
    }
    #TypeFiles = {};
    #getTypeFile(path) {
        const ext = path.split('.').pop()?.toLowerCase();
        return this.#TypeFiles[ext] || (0, fileType_1.default)(path);
    }
    ;
    setTypeFile(ext, type) {
        this.#TypeFiles[ext] = type;
        return this;
    }
    listen(port, callback = FN) {
        const fn = this.toFunction();
        const server = http_1.default.createServer(fn);
        server.listen(port, () => callback(server.address().port));
        return server;
    }
    toFunction() {
        this.__active__();
        return async (req, res) => {
            const request = req;
            const response = res;
            const method = request.method;
            const paths = Object.keys({ ...this.METHODS[method], ...this.METHODS.GET }).map(r => r.split('/').filter(Boolean));
            request.body = await (0, bodyParser_1.default)(request, response);
            (0, betterURL_1.default)(request, paths);
            response.send = data => response.end(toString(data));
            response.json = data => {
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(data));
            };
            response.sendFile = path => {
                if (fs_2.default.isFile(path)) {
                    const type = this.#getTypeFile(path);
                    response.setHeader('Content-Type', type);
                    response.end(fs_1.default.readFileSync(path));
                }
                else
                    next();
            };
            response.status = code => {
                response.statusCode = +code;
                return response;
            };
            const url = request._path || request.path;
            const useUrls = Object.keys(this.METHODS.USE)
                .map(key => [key, request.path.startsWith(key)])
                .filter(([key, bool]) => bool);
            const useUrl = (useUrls[0] || [''])[0] || '*';
            request.static = request.path.replace(useUrl, '');
            response.location = function location(url) {
                return response.setHeader('Location', url);
            };
            response.format = function format(obj) {
                const type = request.headers['accept'] || 'text/html';
                const fn = obj[type] || obj['default'];
                if (fn)
                    fn();
                else
                    response.status(406).send('Not Acceptable');
                return response;
            };
            response.redirect = (url) => (0, redirect_1.default)(url)(request, response, next);
            const valid = [
                ...this.METHODS.USE['*'],
                ...this.METHODS.USE[useUrl],
                ...(this.METHODS[method][url] || []),
                ...(this.METHODS.GET[url] || []),
                ...(this.METHODS[method]['*'] || []),
                ...this.METHODS.GET['*'],
            ].reduce((a, e) => {
                if (!a.includes(e))
                    a.push(e);
                return a;
            }, []);
            let i = 0;
            function next() {
                const use = valid[i];
                i++;
                if (use)
                    use(request, response, next);
            }
            next();
        };
    }
}
function app() {
    return new App();
}
app.redirect = redirect_1.default;
app.json = json_1.default;
app.static = static_1.default;
app.cors = cors_1.default;
app.Router = () => new router_1.default();
module.exports = app;
