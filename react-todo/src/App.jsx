import './App.css'
import {useLocalStorage} from "./hooks/useLocalStorage.js";
import {useEffect, useMemo, useReducer, useState} from "react";
import useToDoReducer, {ACTIONS} from "./hooks/useToDoReducer.js";
import {generateId} from "./utils/helpers.js";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AnalyticsPage from "./components/AnalyticsPage.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const [storedTodos, setStoredTodos] = useLocalStorage('todo-items', [])
  const [editingTodo, setEditingTodo] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'newest'
  })

  const [todos, dispatch] = useReducer(useToDoReducer, []);

  useEffect(() => {
    dispatch({
      type: ACTIONS.SET_TODO,
      payload: storedTodos
    })
  }, [])

  useEffect(() => {
    setStoredTodos(todos)
  }, [todos, setStoredTodos])

  function addTodo(todo) {
    const newTodo = {
      id: generateId(),
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
      category: todo.category,
      dueDate: todo.dueDate,
      completed: false,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString()
    }

    dispatch({type: ACTIONS.ADD_TODO, payload: newTodo})
  }

  function updateTodo(todo) {
    dispatch({
      type: ACTIONS.UPDATE_TODO,
      payload: {
        id: editingTodo,
        update: {
          ...todo,
          updateAt: new Date().toISOString()
        }
      }
    })
  }

  function handleSubmit(todo) {
    if(editingTodo) {
      updateTodo(todo)
    } else {
      addTodo(todo)
    }
  }

  function handleToggle(id) {}

  function handleDelete(id) {
    dispatch({type: ACTIONS.DELETE_TODO, payload: {id}})
    if (editingTodo?.id === id) {
      setEditingTodo(null)
    }
  }

  function handleClearCompleted() {}

  function handleFilterChange(name, value) {
    setFilters((prev) => ({...prev, [name]: value}) )
  }

  const filteredTodos = useMemo(() => {
    let result = [...todos];
    const searchText = filters.search.trim().toLowerCase();

    if (searchText) {
      result = result.filter((todo) => {
        todo.title.toLowerCase().includes(searchText.toLowerCase());
      })
    }

    if (filters.status === 'active') result = result.filter((todo) => !todo.completed);
    if (filters.status === 'completed') result = result.filter((todo) => todo.completed);

    if (filters.priority !== 'all') result = result.filter((todo) => todo.priority === filters.priority);

    if (filters.sortBy === 'newest') {
      result = result.sort((a, b) => new Date(a.createAt) -  new Date(b.createAt) );
    }

    if (filters.sortBy === 'oldest') {
      result = result.sort((a, b) => new Date(b.createAt) -  new Date(a.createAt) );
    }

    return result;
  }, [todos, filters])

  const stats = useMemo(() => {
    return {
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      active: todos.filter((todo) => !todo.completed).length,
      highPriority: todos.filter((todo) => todo.priority === 'high').length,
    }
  }, [todos])



  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={
          <Dashboard stats={stats}
                     editingTodo={editingTodo}
                     onSubmit={handleSubmit}
                    onCancelEdit={() => setEditingTodo(null)}
                    filters = {filters}
                    onFilterChange = {handleFilterChange}
                    onClearCompleted = {handleClearCompleted}
                    todos = {filteredTodos}
                    onToggle = {handleToggle}
                    onDelete = {handleDelete}
                    onEdit = {setEditingTodo}/>
        }></Route>
        <Route path={"analytics"} element={<AnalyticsPage/>}></Route>
      </Route>
    </Routes>
  )
}

export default App
