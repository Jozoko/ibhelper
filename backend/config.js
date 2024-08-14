module.exports = {
  ldap: {
    url: 'ldaps://your-ldap-server',
  },
  radius: {
    host: 'your-radius-server',
    port: 1812,
    secret: 'your-radius-secret',
    timeout: 5000, // Тайм-аут в миллисекундах
  },
  jwt: {
    secret: 'your_jwt_secret',
    expiresIn: '1h',
  },
};
