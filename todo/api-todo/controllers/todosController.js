// All database queries live here.
// Every function is async because talking to Postgres takes time — we use
// await so Node can handle other requests while we wait for the DB.

const pool = require('../db/pool');

// Reusable SELECT column list.
// Postgres stores column names in snake_case (due_date, created_at, updated_at)
// but our frontend expects camelCase, so we alias them with AS.
const SELECT_COLS = `
  id, title, description, priority, category,
  due_date    AS "dueDate",
  completed,
  created_at  AS "createdAt",
  updated_at  AS "updatedAt"
`;


// GET /todos — return all todos, newest first
const getAll = async (_req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${SELECT_COLS} FROM todos ORDER BY created_at DESC`
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// GET /todos/:id — return one todo or 404
const getById = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ${SELECT_COLS} FROM todos WHERE id = $1`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// POST /todos — insert a new row, return the created todo
const create = async (req, res) => {
  const { title, description, priority, category, dueDate, completed } = req.body;

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required and must be a non-empty string' });
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO todos (title, description, priority, category, due_date, completed)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ${SELECT_COLS}`,
      [
        title.trim(),
        typeof description === 'string' ? description.trim() : '',
        ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
        typeof category === 'string' && category.trim() ? category.trim() : 'General',
        typeof dueDate === 'string' ? dueDate : '',
        completed === true,
      ]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// PATCH /todos/:id — update only the fields that were sent, return updated todo
const update = async (req, res) => {
  const { title, description, priority, category, dueDate, completed } = req.body;

  // Build the SET clause dynamically so we only update what was actually sent.
  // $1, $2, ... are placeholders — pg fills them in safely to prevent SQL injection.
  const setClauses = [];  // e.g. ["title = $1", "completed = $2"]
  const values     = [];  // the actual values for each placeholder

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    setClauses.push(`title = $${values.length + 1}`);
    values.push(title.trim());
  }

  if (description !== undefined) {
    setClauses.push(`description = $${values.length + 1}`);
    values.push(String(description).trim());
  }

  if (priority !== undefined && ['low', 'medium', 'high'].includes(priority)) {
    setClauses.push(`priority = $${values.length + 1}`);
    values.push(priority);
  }

  if (category !== undefined && String(category).trim()) {
    setClauses.push(`category = $${values.length + 1}`);
    values.push(String(category).trim());
  }

  if (dueDate !== undefined) {
    setClauses.push(`due_date = $${values.length + 1}`);
    values.push(String(dueDate));
  }

  if (completed !== undefined) {
    setClauses.push(`completed = $${values.length + 1}`);
    values.push(completed === true);
  }

  if (setClauses.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided to update' });
  }

  // Always stamp updated_at (no placeholder needed — NOW() is a Postgres function)
  setClauses.push('updated_at = NOW()');

  // The id goes in as the last value, used in the WHERE clause
  values.push(req.params.id);

  try {
    const { rows } = await pool.query(
      `UPDATE todos
       SET ${setClauses.join(', ')}
       WHERE id = $${values.length}
       RETURNING ${SELECT_COLS}`,
      values
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// DELETE /todos/:id — delete a row, return 204 No Content
const remove = async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      'DELETE FROM todos WHERE id = $1',
      [req.params.id]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


module.exports = { getAll, getById, create, update, remove };
