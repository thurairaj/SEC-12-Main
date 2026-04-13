import './App.css'
import { useEffect, useMemo, useReducer, useState } from 'react'
import useToDoReducer, { ACTIONS } from './hooks/useToDoReducer.js'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api/todosApi.js'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import AnalyticsPage from './components/AnalyticsPage.jsx'
import Dashboard from './components/Dashboard.jsx'

function App() {
  const [todos, dispatch] = useReducer(useToDoReducer, [])
  const [editingTodo, setEditingTodo] = useState(null)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'newest'
  })

  // Load todos from the API once on mount
  useEffect(() => {
    fetchTodos()
      .then((data) => dispatch({ type: ACTIONS.SET_TODO, payload: data }))
      .catch((err) => setError(err.message))
  }, [])

  async function handleSubmit(todo) {
    if (editingTodo) {
      await handleUpdate(todo)
    } else {
      await handleAdd(todo)
    }
  }

  async function handleAdd(todo) {
    try {
      const newTodo = await createTodo(todo)
      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo })
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleUpdate(todo) {
    try {
      const updated = await updateTodo(editingTodo.id, todo)
      dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id: updated.id, updates: updated } })
      setEditingTodo(null)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleToggle(id) {
    const todo = todos.find((t) => t.id === id)
    if (!todo) return
    try {
      const updated = await updateTodo(id, { completed: !todo.completed })
      dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id: updated.id, updates: updated } })
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } })
      if (editingTodo?.id === id) setEditingTodo(null)
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleClearCompleted() {
    const completed = todos.filter((t) => t.completed)
    try {
      await Promise.all(completed.map((t) => deleteTodo(t.id)))
      dispatch({ type: ACTIONS.CLEAR_COMPLETED })
    } catch (err) {
      setError(err.message)
    }
  }

  function handleFilterChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const filteredTodos = useMemo(() => {
    let result = [...todos]
    const searchText = filters.search.trim().toLowerCase()

    if (searchText) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(searchText)
      )
    }

    if (filters.status === 'active')    result = result.filter((t) => !t.completed)
    if (filters.status === 'completed') result = result.filter((t) => t.completed)

    if (filters.priority !== 'all') result = result.filter((t) => t.priority === filters.priority)

    if (filters.sortBy === 'newest') {
      result = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    if (filters.sortBy === 'oldest') {
      result = result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    return result
  }, [todos, filters])

  const stats = useMemo(() => ({
    total:        todos.length,
    completed:    todos.filter((t) => t.completed).length,
    active:       todos.filter((t) => !t.completed).length,
    highPriority: todos.filter((t) => t.priority === 'high').length,
  }), [todos])

  return (
    <>
      {error && (
        <div style={{ background: '#fee', color: '#c00', padding: '8px 16px' }}>
          API error: {error} — <button onClick={() => setError(null)}>dismiss</button>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <Dashboard
              stats={stats}
              editingTodo={editingTodo}
              onSubmit={handleSubmit}
              onCancelEdit={() => setEditingTodo(null)}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearCompleted={handleClearCompleted}
              todos={filteredTodos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onEdit={setEditingTodo}
            />
          } />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
