require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'localhost',
}

module.exports = config;
