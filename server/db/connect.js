// const Pool = require('pg').Pool;
// require('dotenv').config();

// const pool = new Pool({
//   user: 'postgres',
//   password: `${process.env.dataBasePass}`,
//   host: 'localhost',
//   port: 5432,
//   database: 'blog',
// });

// module.exports = pool;

const { Pool } = require('pg');
require('dotenv').config();

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// async function getPostgresVersion() {
//   const client = await pool.connect();
//   try {
//     const res = await client.query('SELECT version()');
//     console.log(res.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPostgresVersion();

module.exports = pool;
