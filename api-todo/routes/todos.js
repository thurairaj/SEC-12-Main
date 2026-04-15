var express = require('express');
var router = express.Router();

var todos = [];
var nextId = 1;

// GET /todos - list all todos
router.get('/', function(req, res) {
  res.json(todos);
});

// GET /todos/:id - get a single todo
router.get('/:id', function(req, res) {
  var todo = todos.find(function(t) { return t.id === parseInt(req.params.id); });
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST /todos - create a todo
router.post('/', function(req, res) {
  var { title, completed } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }
  var todo = {
    id: nextId++,
    title: title.trim(),
    completed: completed === true ? true : false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT /todos/:id - replace a todo
router.put('/:id', function(req, res) {
  var index = todos.findIndex(function(t) { return t.id === parseInt(req.params.id); });
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });

  var { title, completed } = req.body;
  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ error: 'title is required' });
  }

  todos[index] = {
    id: todos[index].id,
    title: title.trim(),
    completed: completed === true ? true : false,
    createdAt: todos[index].createdAt
  };
  res.json(todos[index]);
});

// PATCH /todos/:id - partial update
router.patch('/:id', function(req, res) {
  var todo = todos.find(function(t) { return t.id === parseInt(req.params.id); });
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  var { title, completed } = req.body;
  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'title must be a non-empty string' });
    }
    todo.title = title.trim();
  }
  if (completed !== undefined) {
    todo.completed = completed === true ? true : false;
  }
  res.json(todo);
});

// DELETE /todos/:id - delete a todo
router.delete('/:id', function(req, res) {
  var index = todos.findIndex(function(t) { return t.id === parseInt(req.params.id); });
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
