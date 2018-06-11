let mysql = require('../mysql');

module.exports = function(router, koaBody) {
  return router.post('/test', koaBody, (ctx) => {
    ctx.body = 'hello world';
  }).get('/', async (ctx) => {
    ctx.body = 'hello world';
  }).get('/test/jsonp', koaBody, (ctx) => {
    ctx.body = 'test({"name": "test"})';
  })
};
