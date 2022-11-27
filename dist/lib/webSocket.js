"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const fs_1 = __importDefault(require("fs"));
const fs_2 = __importDefault(require("@agacraft/fs"));
class AgaWebSocket {
    #clients = new Set();
    #events = new Map();
    constructor(server) {
        server.on('upgrade', (req, socket, head) => {
            this.#clients.add(socket);
            socket.on('data', data => {
                try {
                    const message = JSON.parse(data.toString());
                    this.emit(message.event, message.data);
                }
                catch (error) {
                    this.emit('message', data.toString());
                }
            });
            this.emit('connection', socket);
            socket.on('close', () => {
                this.#clients.delete(socket);
                this.emit('disconnect', socket);
            });
        });
        const router = server._events.request;
        server._events.request = (req, res) => {
            if (req.url === '/ws') {
                let path = __dirname + '/../source/ws.js';
                if (fs_2.default.isFile(path))
                    return res.end(fs_1.default.readFileSync(path, 'utf-8').replace('%HOST%', req.headers.host));
            }
            router(req, res);
        };
    }
    addEventListener(event, callback) {
        if (typeof callback !== 'function')
            throw new Error('callback must be a function');
        if (!this.#events.has(event)) {
            this.#events.set(event, new Set());
        }
        this.#events.get(event).add(callback);
    }
    on(event, callback) {
        this.addEventListener(event, callback);
    }
    emit(event, ...data) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(callback => callback(...data));
        }
    }
}
module.exports = AgaWebSocket;
