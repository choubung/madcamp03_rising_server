// models/userModel.js

const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to MySQL database!');
});

const createUser = (userData, callback) => {
  const { username, password, email } = userData;
  const query = `INSERT INTO users (username, password, email) VALUES (?, ?, ?)`;
  connection.query(query, [username, password, email], callback);
};

const findUserByUsername = (username, callback) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  connection.query(query, [username], callback);
};

module.exports = {
  createUser,
  findUserByUsername
};