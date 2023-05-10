"use strict";
function queryToObject(query) {
    return Object.fromEntries(query.split('&').map(r => r.split('=')));
}
function clearPath(path) {
    const newpath = path.split(/\//g).filter(Boolean).join('/').replace(/\/$/, '');
    const value = newpath === '*' ? newpath : `/${newpath}`;
    return value;
}
function validatePath(path) {
    return function (paths) {
        if (paths.length === path.length &&
            paths.every((p, i) => p === path[i] || p.startsWith(':')))
            return paths;
        return null;
    };
}
function compareValue(path) {
    return [
        path,
        new Function(`return ${path.map(p => (p.startsWith(':') ? 0 : 1)).join('+')}`)(),
    ];
}
function getPath(paths, pathArray) {
    const validPath = paths
        .map(validatePath(pathArray))
        .filter(Boolean);
    return (validPath.map(compareValue).sort((a, b) => b[1] - a[1])[0] || [])[0] || [];
}
function getParams(path, pathArray) {
    const value = path.reduce((obj, p, i) => {
        if (p.startsWith(':')) {
            obj[p.slice(1)] = pathArray[i];
        }
        return obj;
    }, {});
    return value;
}
function betterURL(req, paths) {
    const { url = '/' } = req;
    const [path, query = ''] = url.split('?');
    req.query = queryToObject(query);
    req.path = clearPath(path);
    req.pathArray = req.path.split('/').filter(Boolean);
    const _path = getPath(paths, req.pathArray);
    req.params = getParams(_path, req.pathArray);
    req._path = clearPath(_path.join('/'));
}
betterURL.clearPath = clearPath;
module.exports = betterURL;
