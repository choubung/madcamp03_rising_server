// init-db.js

const mysql = require('mysql2');

// MySQL 데이터베이스 연결 설정
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // 개발자 PC IP 주소
  user: process.env.DB_USER, // MySQL 유저명
  password: process.env.DB_PASSWORD, // MySQL 비밀번호
  database: process.env.DB_NAME // 사용할 데이터베이스 이름
});

// 연결
connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database!');
  
    // 테이블 생성 쿼리 실행
    createTables();
  });
  
  // 테이블 생성 함수
  function createTables() {
    // 유저 정보 테이블 생성 쿼리
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL
      )
    `;
  
    // 메모 정보 테이블 생성 쿼리
    const createMemoTable = `
      CREATE TABLE IF NOT EXISTS memos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        author_id INT NOT NULL,
        content TEXT,
        date TEXT,
        is_private BOOLEAN,
        FOREIGN KEY (author_id) REFERENCES users(id)
      )
    `;
  
    // 테이블 생성 쿼리 실행
    connection.query(createUserTable, function(err, results, fields) {
      if (err) {
        console.error('Error creating users table:', err);
      } else {
        console.log('Created users table successfully!');
      }
    });
  
    connection.query(createMemoTable, function(err, results, fields) {
      if (err) {
        console.error('Error creating memos table:', err);
      } else {
        console.log('Created memos table successfully!');
      }
  
      // 모든 작업이 완료되면 연결 종료
      connection.end();
    });
  }