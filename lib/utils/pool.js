const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: process.env.PGSSLMODE && { rejectUnauthorized: false } for deployed db only,
});

// eslint-disable-next-line no-console
pool.on('connect', () => console.log('🐘 Postgres connected'));

module.exports = pool;
