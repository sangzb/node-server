let mysql = require('../mysql');
let mkdirp = require('mkdirp');
let path = require('path');

module.exports = function(router, koaBody) {
  router.post('/login', koaBody, function *(next) {
    let result = yield mysql.getUser();

    console.log(result);
    this.body = result;
  });
  
  router.get('/user', koaBody, function *(next) {
    try {
      let username = this.request.query ? this.request.query.userName : '';
console.log(123)

      console.log(username);
      let result = yield mysql.getUser(username);
      this.body = { data: result, status: 200 }
    }catch (e){
      this.body = e//{ data: [], status: 500 };
    }
  });

  router.post('/user', koaBody, function *(next) {
    try {
      let username = this.request;
      console.log(username);
      //let result = yield mysql.registerUser(param);
      //this.body = { data: result, status: 200 }
    }catch(e) {
      this.body = { data: [], status: 500 };
    }
  });

  router.post('/register', koaBody, function *(next) {
    let param = this.request.body;
    try {
      let result = ''//yield mysql.userRegister({userName: param.userName, password: param.password});
      console.log(result,'==sdf=ghf=ds=dfghfd=sf=gh=fds=fgh=');
      let dir = yield mkdirHelper(`/www/user/${param.userName}`);
      console.log(dir, 'mkdir');
      this.body = result;
    }catch(e) {
      this.body = { data: [], status: 500 };
    }
  });
  
  return router;
};

function mkdirHelper(path) {
  console.log(path);
  return new Promise((resolve, reject) => {
    console.log('promise');
    mkdirp(path, (e) => {
      console.log(e, 'callback');
      if (e) {
        reject({
          'status': 500,
          'message': 'fail'
        });
      }else {
        resolve ({
          'status': 0,
          'message': 'success'
        });
      }
    });
  })
}