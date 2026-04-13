// sequelize.js — creates a shared Sequelize instance connected to Postgres.
//
// DATABASE_URL is loaded from .env by dotenv in app.js before this runs.

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,   // set to console.log to see generated SQL
});

module.exports = sequelize;
