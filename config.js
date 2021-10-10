require('dotenv').config()
module.exports = {
  DB: {
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DATABASE: process.env.DB_DATABASE,
    DIALECT: process.env.DB_DIALECT
  }
};