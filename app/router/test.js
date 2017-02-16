var mysql = require('../mysql');

module.exports = function(router, koaBody) {
  return router.post('/test', koaBody, function *(next) {
    this.body = this.request.body;
  }).get('/', function *(next) {
    var request = this.request;
    var response = this.response;
    var path = this.path;
    var result = yield mysql.getUser();
    response.body = result;
  })
};