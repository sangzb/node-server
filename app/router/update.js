var fs = require('fs');
var path = require('path');

//var wp = __dirname;
var wp = '/www/upload/';

module.exports = function(router, koaBody) {
  return router.post('/upload', koaBody, function *(next) {
    if (this.request.method === 'POST') {
      var file    = this.request.body.files.file;

      this.body = yield writeImage(this.req, file);
      yield next;
    }
  });
};

var writeImage = function(request, file) {
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
              src  : 'http://' + path.join(request.headers.host, `/upload/${file.name}?${Date.now()}`)
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
