var mysql = require('mysql');
var promise = require('promise');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'rootdb',
  database : 'develop'
});

module.exports = {
  getUser: function () {
    return new Promise(function (resolve, reject) {
      connection.query('select * from user', function (err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
  }
};