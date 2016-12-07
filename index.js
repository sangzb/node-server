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
  this.body = count;
  this.head = '<meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge,IE=9,IE=8,chrome=1" > <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" > <meta name="apple-mobile-web-app-capable" content="yes" > <meta name="apple-mobile-web-app-status-bar-style" content="black" > <meta content="" name="description" >'
})



