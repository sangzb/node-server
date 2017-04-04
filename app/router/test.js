let mysql = require('../mysql');

module.exports = function(router, koaBody) {
  return router.post('/test', koaBody, function *(next) {
    this.body = this.request;
  }).get('/', function *(next) {
    let request = this.request;
    let response = this.response;
    let path = this.path;
    let result = yield mysql.getUser();
    response.body = result;
  }).get('/test/jsonp', koaBody, function *(){
    this.body = 'test({"name": "test"})';
  })
};