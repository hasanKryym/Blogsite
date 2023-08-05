const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'postgres',
  password: `${process.env.dataBasePass}`,
  host: 'localhost',
  port: 5432,
  database: 'blog',
});

module.exports = pool;
