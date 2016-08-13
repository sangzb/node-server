var utils = require('./app/utils');
var C = utils.C;

var http = require('http');
var koa = require('koa');
var session = require('koa-session');
var  app = koa();
http.createServer(app.callback()).listen(C('APP_PORT'));

app.keys = ['some secret hurr'];
app.use(session(app));

app.use(function *(){
  var request = this.request;
  var response = this.response;
  var count = this.session.viewed || 0;
  count++;
  var path = this.path;
  this.session.viewed = count;
  this.body = path;
})



