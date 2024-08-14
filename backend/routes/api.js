const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

// Пример простого API запроса
router.post('/execute', verifyToken, (req, res) => {
  const { system, params } = req.body;

  // Логика выполнения запроса
  const apiResult = `Executed request for system ${system} with params ${JSON.stringify(params)}`;

  res.json({ success: true, result: apiResult });
});

// Middleware для проверки JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('Token is required');

  jwt.verify(token, config.jwt.secret, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = decoded;
    next();
  });
}

module.exports = router;
