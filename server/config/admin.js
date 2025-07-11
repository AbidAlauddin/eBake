// config/admin.js

const crypto = require('crypto');

module.exports = ({ env }) => ({
  apiToken: {
    salt: env('API_TOKEN_SALT', crypto.randomBytes(16).toString('base64')),
  },
  auth: {
    secret: env('AUTH_SECRET', crypto.randomBytes(16).toString('base64')),
  },
});
