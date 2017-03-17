var mysql = require('mysql');
var promise = require('promise');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'develop',
  password : 'develop',
  database : 'develop'
});

module.exports = {
  getUser: function (userName) {
    return new Promise(function (resolve, reject) {
      connection.query('select * from user where name= "' + userName + '"', function (err, rows, fields) {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    })
  },
  userLogin: function(user) {
    return new Promise((resolve, reject) => {
      connection.query(`select * from user where name=${user.userName}`, function(err, rows, fields) {
        if (err) {
          reject(err);
        }else {
          resolve(rows);
        }
      });
    })
  }
};