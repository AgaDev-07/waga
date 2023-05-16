"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(fileU) {
    const file = fileU.toLowerCase();
    if (file.endsWith('.png'))
        return 'image/png';
    else if (file.endsWith('.jpg'))
        return 'image/jpg';
    else if (file.endsWith('.jpeg'))
        return 'image/jpeg';
    else if (file.endsWith('.gif'))
        return 'image/gif';
    else if (file.endsWith('.ico'))
        return 'image/x-icon';
    else if (file.endsWith('.svg'))
        return 'image/svg+xml';
    else if (file.endsWith('.webp'))
        return 'image/webp';
    else if (file.endsWith('.webm'))
        return 'video/webm';
    else if (file.endsWith('.mp4'))
        return 'video/mp4';
    else if (file.endsWith('.mp3'))
        return 'audio/mpeg';
    else if (file.endsWith('.ogg'))
        return 'audio/ogg';
    else if (file.endsWith('.otf'))
        return 'font/otf';
    else if (file.endsWith('.html'))
        return 'text/html';
    else if (file.endsWith('.css'))
        return 'text/css';
    else if (file.endsWith('.txt'))
        return 'text/plain';
    else if (file.endsWith('.js'))
        return 'application/javascript';
    else if (file.endsWith('.json'))
        return 'application/json';
    else if (file.endsWith('.pdf'))
        return 'application/pdf';
    else if (file.endsWith('.zip'))
        return 'application/zip';
    else if (file.endsWith('.gz'))
        return 'application/gzip';
    else
        return 'text/plain';
}
exports.default = default_1;
