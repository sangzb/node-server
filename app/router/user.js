var mysql = require('../mysql');

module.exports = function(router, koaBody) {
  return router.post('/login', koaBody, function *(next) {
    this.body = this.request.body;
  });
};