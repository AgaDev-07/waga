import { isDirectory, isFile } from '@agacraft/fs';
import { WagaNext, WagaRequest, WagaResponse } from '../types';

export = function (path:string) {
  return (req:WagaRequest, res:WagaResponse, next: WagaNext) => {
    const  url = req.params['*'];
    const route = `${path}/${url}`;
    if(isFile(route)) res.sendFile(route)
    else if(isFile(`${route}.html`)) res.sendFile(`${route}.html`)
    else if(isDirectory(route) && isFile(`${route}/index.html`)) res.sendFile(`${route}/index.html`)
    else next()
  }
}
