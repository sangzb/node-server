let mysql = require('../mysql');
let mkdirp = require('mkdirp');
let path = require('path');

module.exports = function(router, koaBody) {
  router.post('/login', koaBody, async (ctx) => {
    ctx.body = await mysql.getUser();
  });
  
  router.get('/user', koaBody, async (ctx) => {
    try {
      let username = ctx.request.query ? ctx.request.query.userName : '';
      let result = await mysql.getUser(username);
      ctx.body = { data: result, status: 200 }
    }catch (e){
      ctx.body = e//{ data: [], status: 500 };
    }
  });

  router.post('/user', koaBody, async (ctx) => {
    try {
      let username = ctx.request;
      //let result = yield mysql.registerUser(param);
      //this.body = { data: result, status: 200 }
    }catch(e) {
      ctx.body = { data: [], status: 500 };
    }
  });

  router.post('/register', koaBody, async (ctx) => {
    let param = ctx.request.body;
    try {
      let result = ''//yield mysql.userRegister({userName: param.userName, password: param.password});
      console.log(result,'==sdf=ghf=ds=dfghfd=sf=gh=fds=fgh=');
      let dir = await mkdirHelper(`/www/user/${param.userName}`);
      console.log(dir, 'mkdir');
      ctx.body = result;
    }catch(e) {
      ctx.body = { data: [], status: 500 };
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