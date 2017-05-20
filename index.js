let http = require('http');

let utils = require('./app/utils');
let C = utils.C;

let Koa = require('koa');
let cors = require('koa-cors')();
let session = require('koa-session');
let Router = require('koa-router');
let koaBody = require('koa-body')({ multipart: true });
let app = new Koa();
let router = new Router();


app.use(cors);
app.keys = ['some secret hurr'];
app.use(session(app));




router = require('./app/router/test.js')(router, koaBody);
router = require('./app/router/user.js')(router, koaBody);
router = require('./app/router/update.js')(router, koaBody);

app.use(router.routes()).use(router.allowedMethods());

http.createServer(app.callback()).listen(C('APP_PORT'));

