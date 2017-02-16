var fs = require('fs');
var path = require('path');

module.exports = function(router, koaBody) {
  return router.post('/upload', koaBody, function *(next) {
    if (this.request.method === 'POST') {
      var demoFile = path.join('/usr/www/images', 'demo.jpg');
      var file    = this.request.body.files.file,
        demoSrc = 'http://' + path.join(this.req.headers.host, `demo.jpg?${Date.now()}`);

      this.body = yield new Promise((resolve, reject) => {
        fs
          .createReadStream(file.path)
          .pipe(fs.createWriteStream(demoFile))
          .on('finish', function () {
            resolve({
              mtime: file.mtime,
              name : file.name,
              size : file.size,
              type : file.type,
              src  : demoSrc
            });
          });
      });
      yield next;
    }
  });
};
