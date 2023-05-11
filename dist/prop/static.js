"use strict";
const fs_1 = require("@agacraft/fs");
function getType(path) {
    const file = path.split('.');
    const ext = file[file.length - 1];
    switch (ext) {
        case 'html':
            return 'text/html';
        case 'css':
            return 'text/css';
        case 'js':
            return 'application/javascript';
        case 'json':
            return 'application/json';
        case 'png':
            return 'image/png';
        case 'jpg':
            return 'image/jpg';
        case 'jpeg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'svg':
            return 'image/svg+xml';
        case 'ico':
            return 'image/x-icon';
        case 'mp3':
            return 'audio/mpeg';
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'ogg':
        case 'ogv':
        case 'oga':
            return 'audio/ogg';
        case 'wav':
            return 'audio/wav';
        case 'zip':
            return 'application/zip';
        case 'pdf':
            return 'application/pdf';
        case 'txt':
            return 'text/plain';
        case 'xml':
            return 'text/xml';
        case 'csv':
            return 'text/csv';
        case 'rtf':
            return 'application/rtf';
        case 'doc':
            return 'application/msword';
        case 'docx':
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        case 'xls':
            return 'application/vnd.ms-excel';
        case 'xlsx':
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case 'ppt':
            return 'application/vnd.ms-powerpoint';
        case 'pptx':
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        case 'odt':
            return 'application/vnd.oasis.opendocument.text';
        case 'ods':
            return 'application/vnd.oasis.opendocument.spreadsheet';
        case 'odp':
            return 'application/vnd.oasis.opendocument.presentation';
        case 'wasm':
            return 'application/wasm';
        default:
            return 'text/plain';
    }
}
module.exports = function (path) {
    return function (req, res, next) {
        const route = `${path}/${req.static}`;
        if ((0, fs_1.isFile)(route))
            res.setHeader('Content-Type', getType(route)).sendFile(route);
        else if ((0, fs_1.isFile)(`${route}.html`))
            res.sendFile(`${route}.html`);
        else if ((0, fs_1.isDirectory)(route) && (0, fs_1.isFile)(`${route}/index.html`))
            res.sendFile(`${route}/index.html`);
        else
            next();
    };
};
