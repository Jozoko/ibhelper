const express = require('express');
const ldapjs = require('ldapjs');
const jwt = require('jsonwebtoken');
const radius = require('node-radius');
const config = require('../config');

const router = express.Router();

// LDAPS Authentication
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Пример подключения к LDAP
  const client = ldapjs.createClient({
    url: config.ldap.url,
  });

  client.bind(username, password, (err) => {
    if (err) {
      return res.status(401).send('Authentication failed');
    }

    // Если успешная аутентификация, генерируем JWT
    const token = jwt.sign({ username }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });

    // RADIUS второй фактор
    const radiusClient = radius.createClient({
      host: config.radius.host,
      port: config.radius.port,
      secret: config.radius.secret,
      timeout: config.radius.timeout,
    });

    radiusClient.accessRequest(username, (radiusErr, result) => {
      if (radiusErr || !result.success) {
        return res.status(401).send('RADIUS authentication failed');
      }

      // Если успешно, отправляем токен
      res.json({ token });
    });
  });
});

module.exports = router;
