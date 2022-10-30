"use strict";
function cors(options = {}) {
    if (!options.origin)
        options.origin = () => true;
    if (!options.methods)
        options.methods = 'GET,POST,PUT,DELETE';
    if (options.methods instanceof Array)
        options.methods = options.methods.join(',');
    return function (req, res, next) {
        if (options.origin && options.origin(req.headers.origin)) {
            res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
        }
        if (options.methods) {
            res.setHeader('Access-Control-Allow-Methods', options.methods);
        }
        next();
    };
}
module.exports = cors;
