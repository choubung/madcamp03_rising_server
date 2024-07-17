// routes/memos.js

var express = require('express');
var router = express.Router();
const memoController = require('../controllers/memoController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware.authenticateToken, memoController.createMemo);
router.get('/', authMiddleware.authenticateToken, memoController.getUserMemos);
router.get('/random', memoController.getRandomMemo); // 인증 미들웨어 제거
router.delete('/:id', authMiddleware.authenticateToken, memoController.deleteMemo);

module.exports = router;