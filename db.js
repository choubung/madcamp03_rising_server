// db.js
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST, // 개발자 PC IP 주소
    user: process.env.DB_USER, // MySQL 유저명
    password: process.env.DB_PASSWORD, // MySQL 비밀번호
    database: process.env.DB_NAME // 사용할 데이터베이스 이름
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});

module.exports = db;