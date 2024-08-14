const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config');

const router = express.Router();

router.get('/me', verifyToken, (req, res) => {
  // Здесь можно получить информацию о пользователе из AD
  res.json({ username: req.user.username });
});

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
