let fs = require('fs');
let path = require('path');
let utils = require('../utils');

let C = utils.C;

//let wp = __dirname;
let wp = '/www/upload/';

module.exports = function(router, koaBody) {
  return router.post('/upload', koaBody, async (ctx) => {
    if (ctx.request.method === 'POST') {
      let file = ctx.request.body.files.file;
      ctx.body = await writeImage(ctx.req, file);
    }
  });
};

let writeImage = function(request, file) {
  return new Promise((resolve, reject) => {
    try{
      fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(path.join(wp, file.name)))
        .on('finish', () => {
          resolve(
            {
              mtime: file.mtime,
              name : file.name,
              size : file.size,
              type : file.type,
              src  : 'http://' + path.join(C('HOST_URI'), `/upload/${file.name}?${Date.now()}`)
            }
          )
        })
    }catch(e) {
      reject({
        error: e
      });
    }
  })
};
