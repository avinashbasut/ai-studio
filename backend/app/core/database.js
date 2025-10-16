
const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  connectionString: config.databaseUrl,
});

pool.on('connect', () => {
  console.log('Connected to the database!');
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
