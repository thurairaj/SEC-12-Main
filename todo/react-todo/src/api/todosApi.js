// All HTTP calls to the Express API live here.
// Components and App.jsx never use fetch() directly — they call these functions.

const BASE = '/todos';

// GET /todos — fetch all todos from the server
export async function fetchTodos() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
}

// POST /todos — create a new todo, returns the created todo (with server-assigned id)
export async function createTodo(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create todo');
  return res.json();
}

// PATCH /todos/:id — partially update a todo, returns the updated todo
export async function updateTodo(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
}

// DELETE /todos/:id — delete a todo (returns nothing on success)
export async function deleteTodo(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete todo');
}
