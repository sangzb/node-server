let fs = require('fs');
let path = require('path');

let mysql = require('mysql');
let promise = require('promise');
let connection = mysql.createConnection({
  host     : '45.77.22.206',
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
  },
  userRegister: function(user) {
    return new Promise((resolve, reject) => {
      connection.query(`insert into user (name, password, created, updated) values ('${user.userName}', '${user.password}', '2017-03-03 00:00:01', '2017-03-03 23:59:59')`, function(err, rows, fields) {
        if (err) {
          reject(err);
        }else {
          resolve(rows);
        }
      });
    })
  }
};