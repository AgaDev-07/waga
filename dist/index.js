"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const fs_2 = __importDefault(require("@agacraft/fs"));
const bodyParser_1 = __importDefault(require("./lib/bodyParser"));
const betterURL_1 = __importDefault(require("./lib/betterURL"));
const cors_1 = __importDefault(require("./lib/cors"));
const router_1 = __importDefault(require("./lib/router"));
const statuses_1 = __importDefault(require("./lib/statuses"));
const escapeHTML_1 = __importDefault(require("./lib/escapeHTML"));
const webSocket_1 = __importDefault(require("./lib/webSocket"));
function toString(str) {
    if (typeof str === 'string')
        return str;
    try {
        return JSON.stringify(str);
    }
    catch (error) {
        return '' + str;
    }
}
class App extends router_1.default {
    #server;
    constructor(server) {
        super();
        this.#server = server;
        this.get('*', (req, res) => {
            res.status(404).send('Not Found');
        });
    }
    listen(port, callback) {
        this.__active__();
        this.#server.port = () => this.#server.address()?.port;
        this.#server.listen(port, () => callback(this.#server.port()));
        return this.#server;
    }
}
function app() {
    let METHODS = {};
    const server = http_1.default.createServer(async (req, res) => {
        const request = req;
        const response = res;
        const method = request.method;
        const paths = Object.keys({ ...METHODS[method], ...METHODS.GET }).map(r => r.split('/').filter(Boolean));
        request.body = await (0, bodyParser_1.default)(request, response);
        (0, betterURL_1.default)(request, paths);
        response.send = (data) => response.end(toString(data));
        response.json = (data) => {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(data));
        };
        response.sendFile = (path) => {
            if (fs_2.default.isFile(path))
                response.end(fs_1.default.readFileSync(path, 'utf-8'));
            else
                METHODS.GET['*'][0](request, response, next);
        };
        response.status = (code) => {
            response.statusCode = +code;
            return response;
        };
        const url = request._path || request.path;
        const useUrls = Object.keys(METHODS.USE)
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
                }
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
            ...METHODS.USE['*'],
            ...METHODS.USE[useUrl],
            ...(METHODS[method][url] || []),
            ...(METHODS.GET[url] || []),
            ...(METHODS[method]['*'] || []),
            ...METHODS.GET['*'],
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
    });
    const _app = new App(server);
    METHODS = _app.METHODS;
    return _app;
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
app.WebSocket = (server) => new webSocket_1.default(server);
module.exports = app;
