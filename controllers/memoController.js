// controllers/memoController.js

const db = require('../db');
const jwt = require('jsonwebtoken');

exports.createMemo = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id: author_id } = decoded;
  const { content, date, isPrivate } = req.body;

  const query = 'INSERT INTO memos (author_id, content, date, is_private) VALUES (?, ?, ?, ?)';
  db.query(query, [author_id, content, date, isPrivate], (err, result) => {
    if (err) {
      console.error('Error creating memo:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json({ id: result.insertId, author_id, content, date, is_private: isPrivate });
  });
};

exports.getUserMemos = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id: author_id } = decoded;

  const query = 'SELECT * FROM memos WHERE author_id = ?';
  db.query(query, [author_id], (err, results) => {
    if (err) {
      console.error('Error fetching memos:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(200).json(results);
  });
};

exports.getRandomMemo = (req, res) => {
  const query = 'SELECT * FROM memos WHERE is_private = FALSE ORDER BY RAND() LIMIT 1';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching random memo:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      return res.status(404).send('No public memos found');
    }

    res.status(200).json(results[0]);
  });
};

exports.deleteMemo = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { id: author_id } = decoded;
  const { id } = req.params;

  const query = 'DELETE FROM memos WHERE id = ? AND author_id = ?';
  db.query(query, [id, author_id], (err, result) => {
    if (err) {
      console.error('Error deleting memo:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('Memo not found or not authorized');
    }

    res.status(200).json({ id });
  });
};