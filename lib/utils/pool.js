const { Pool } = require('pg');

// const pool = process.env.ENVIRONMENT !== 'dev'
//   ? new Pool({
//     connectionString: process.env.DATABASE_URL,
//     ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
//   })
//   : new Pool({
//     connectionString: process.env.DATABASE_URL
//   });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.PGSSLMODE && { rejectUnauthorized: false }
});


// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));

module.exports = pool;
