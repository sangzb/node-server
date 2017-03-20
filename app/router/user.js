var mysql = require('../mysql');

module.exports = function(router, koaBody) {
  router.post('/login', koaBody, function *(next) {
    var result = yield mysql.getUser();

    console.log(result);
    this.body = result;
  });
  
  router.get('/user', koaBody, function *(next) {
    try {
      var username = this.request.query ? this.request.query.userName : '';
      var result = yield mysql.getUser(username);
      this.body = { data: result, status: 200 }
    }catch (e){
      this.body = { data: [], status: 500 };
    }
  });

  router.post('/user', koaBody, function *(next) {
    try {
      var username = this.request;
      console.log(username);
      //var result = yield mysql.registerUser(param);
      //this.body = { data: result, status: 200 }
    }catch (e){
      this.body = { data: [], status: 500 };
    }
  });
  
  return router;
};