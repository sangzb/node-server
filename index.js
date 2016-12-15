var utils = require('./app/utils');
var C = utils.C;
var mysql = require('./app/mysql');
var promise = require('promise');

var http = require('http');
var koa = require('koa');
var session = require('koa-session');
var  app = koa();

http.createServer(app.callback()).listen(C('APP_PORT'));

app.keys = ['some secret hurr'];
app.use(session(app));

app.use(function *(next){
  var st = new Date();
  yield next;
  var et = new Date();
  console.log(et.valueOf() - st.valueOf());
});

app.use(function *(next){
  var request = this.request;
  var response = this.response;
  var path = this.path;
  var result = yield mysql.getUser();
  response.body = result;
});


