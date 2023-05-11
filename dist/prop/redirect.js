"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const escapeHTML_1 = __importDefault(require("../lib/escapeHTML"));
const statuses_1 = __importDefault(require("../lib/statuses"));
module.exports = function (url) {
    return function (request, response, next) {
        if (request.url === url) {
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
            next();
        }
        response.status(404).send('<h1>Redirected to the same page</h1>');
        return response;
    };
};
