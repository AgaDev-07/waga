import Router from './lib/router';
import cors from './prop/cors';
import _static from './prop/static';
import json from './prop/json';
import redirect from './prop/redirect';
import App from './App';
function app() {
	return new App();
}
app.redirect = redirect;
app.json = json;
app.static = _static;
app.cors = cors;
app.Router = () => new Router();

export = app;
