require('dotenv').config(); // must be first — loads .env into process.env

const express   = require('express');
const cors      = require('cors');
const sequelize = require('./db/sequelize');
require('./models/Todo'); // register model with sequelize before sync

const app  = express();
const PORT         = process.env.PORT        || 3000;
const CORS_ORIGINS = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

// Allow any origin that appears in the CORS_ORIGIN list.
// If the request origin isn't in the list, cors() blocks it with a 403.
app.use(cors({ origin: CORS_ORIGINS }));

// Middleware: parse incoming JSON request bodies
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter);

// 404 handler — catches any unmatched routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

// sync({ force: false }) creates tables that don't exist yet without dropping existing data.
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

module.exports = app;
