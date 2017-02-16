var http = require('http');

var utils = require('./app/utils');
var C = utils.C;

var koa = require('koa');
var cors = require('koa-cors')();
var session = require('koa-session');
var router = require('koa-router')();
var koaBody = require('koa-body')({ multipart: true });
var app = koa();


app.use(cors);
app.keys = ['some secret hurr'];
app.use(session(app));


router = require('./app/router/test.js')(router, koaBody);
router = require('./app/router/user.js')(router, koaBody);
router = require('./app/router/update.js')(router, koaBody);

app.use(router.routes()).use(router.allowedMethods());

http.createServer(app.callback()).listen(C('APP_PORT'));

