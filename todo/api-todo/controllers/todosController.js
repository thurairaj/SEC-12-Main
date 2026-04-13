const Todo = require('../models/Todo');

// GET /todos — return all todos, newest first
const getAll = async (_req, res) => {
  try {
    const todos = await Todo.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// GET /todos/:id — return one todo or 404
const getById = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.status(200).json(todo);
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
    const todo = await Todo.create({
      title:       title.trim(),
      description: typeof description === 'string' ? description.trim() : '',
      priority:    ['low', 'medium', 'high'].includes(priority) ? priority : 'medium',
      category:    typeof category === 'string' && category.trim() ? category.trim() : 'General',
      dueDate:     typeof dueDate === 'string' ? dueDate : '',
      completed:   completed === true,
    });
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// PATCH /todos/:id — update only the fields that were sent, return updated todo
const update = async (req, res) => {
  const { title, description, priority, category, dueDate, completed } = req.body;
  const fields = {};

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    fields.title = title.trim();
  }

  if (description !== undefined) fields.description = String(description).trim();
  if (priority !== undefined && ['low', 'medium', 'high'].includes(priority)) fields.priority = priority;
  if (category !== undefined && String(category).trim()) fields.category = String(category).trim();
  if (dueDate !== undefined) fields.dueDate = String(dueDate);
  if (completed !== undefined) fields.completed = completed === true;

  if (Object.keys(fields).length === 0) {
    return res.status(400).json({ error: 'No valid fields provided to update' });
  }

  try {
    const todo = await Todo.findByPk(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    await todo.update(fields);
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// DELETE /todos/:id — delete a row, return 204 No Content
const remove = async (req, res) => {
  try {
    const deleted = await Todo.destroy({ where: { id: req.params.id } });
    if (deleted === 0) return res.status(404).json({ error: 'Todo not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


module.exports = { getAll, getById, create, update, remove };
