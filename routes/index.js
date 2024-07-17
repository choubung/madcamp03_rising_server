//index.js

var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

// MySQL 데이터베이스 연결 설정
var connection = mysql.createConnection({
  host: process.env.DB_HOST, // 데이터베이스 호스트
  user: process.env.DB_USER, // MySQL 유저명
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME // 사용할 데이터베이스 이름
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello, World!</h1>');
});

// MySQL 쿼리 테스트
router.get('/test-db', function(req, res, next) {
  connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    res.send('The solution is: ' + results[0].solution);
  });
});

module.exports = router;