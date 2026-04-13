// pool.js — creates a shared Postgres connection pool.
//
// Why a pool?
// Opening a new database connection for every request is expensive.
// A pool keeps a set of connections open and reuses them, which is
// much faster and the standard approach for web servers.

const { Pool } = require('pg');

// The Pool reads DATABASE_URL from process.env (loaded by dotenv in app.js).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Log a message when the pool successfully connects for the first time.
pool.on('connect', () => {
  console.log('Connected to Postgres');
});

// Surface any pool-level errors so they don't go silently missing.
pool.on('error', (err) => {
  console.error('Unexpected Postgres pool error:', err.message);
});

module.exports = pool;
