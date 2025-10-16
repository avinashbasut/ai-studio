
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 8000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
};
