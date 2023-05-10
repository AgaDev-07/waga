"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = __importDefault(require("@agacraft/fs"));
const router_1 = __importDefault(require("./lib/router"));
const betterURL_1 = __importDefault(require("./lib/betterURL"));
const statuses_1 = __importDefault(require("./lib/statuses"));
const bodyParser_1 = __importDefault(require("./lib/bodyParser"));
const escapeHTML_1 = __importDefault(require("./lib/escapeHTML"));
const cors_1 = __importDefault(require("./lib/cors"));
function toString(data) {
    if (typeof data === 'string')
        return data;
    if (data instanceof Buffer)
        return data.toString();
    if (data instanceof Object)
        return JSON.stringify(data);
    return `${data}`;
}
class App extends router_1.default {
    constructor() {
        super();
        this.get('*', (req, res) => {
            res.status(404).send('404 Not Found');
        });
    }
    listen(port, callback) {
        this.__active__();
        const fn = this.toFunction();
        const server = http_1.default.createServer(fn);
        server.listen(port, callback);
    }
    toFunction() {
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
                if (fs_2.default.isFile(path))
                    response.end(fs_1.default.readFileSync(path, 'utf-8'));
                else
                    this.METHODS.GET['*'][0](request, response, next);
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
            response.redirect = function redirect(url) {
                let address = url;
                let body = '';
                let status = 302;
                address = response.location(address).getHeader('Location');
                response.format({
                    text: function () {
                        body = statuses_1.default.message[status] + '. Redirecting to ' + address;
                    },
                    html: function () {
                        var u = (0, escapeHTML_1.default)(address);
                        body = '<p>' + statuses_1.default.message[status] + '. Redirecting to <a href="' + u + '">' + u + '</a></p>';
                    },
                    default: function () {
                        body = '';
                    },
                });
                response.status(status).setHeader('Content-Length', Buffer.byteLength(body));
                if (request.method === 'HEAD') {
                    response.end();
                }
                else {
                    response.end(body);
                }
                return response;
            };
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
function toJson(str) {
    try {
        return JSON.parse(str);
    }
    catch (error) {
        return {};
    }
}
app.json =
    () => (req, res, next) => {
        req.body = toJson(req.body);
        next();
    };
app.static =
    (path) => (req, res, next) => {
        const route = `${path}/${req.static}`;
        if (fs_2.default.isFile(route))
            res.sendFile(route);
        else if (fs_2.default.isDirectory(route) && fs_2.default.isFile(`${route}/index.html`))
            res.sendFile(`${route}/index.html`);
        else if (fs_2.default.isFile(`${route}.html`))
            res.sendFile(`${route}.html`);
        else
            next();
    };
app.cors = cors_1.default;
app.Router = () => new router_1.default();
module.exports = app;
