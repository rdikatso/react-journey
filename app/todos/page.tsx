'use client'
import { useState, useEffect } from 'react'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])

  const [input, setInput] = useState('')

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }


  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  // Load persisted todos and filter on initial mount (client-side only)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('todos')
      if (raw !== null) {
        try {
          const parsed = JSON.parse(raw) as Todo[]
          setTimeout(() => setTodos(parsed), 0)
        } catch {
          // ignore parse errors
        }
      }

      const v = localStorage.getItem('filter')
      if (v === 'active' || v === 'completed') {
        setTimeout(() => setFilter(v as 'active' | 'completed'), 0)
      }
    } catch {
      // ignore
    }
  }, [])

  // Persist todos to localStorage when they change
  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos))
    } catch {
      // ignore
    }
  }, [todos])

  // Persist filter selection
  useEffect(() => {
    try {
      localStorage.setItem('filter', filter)
    } catch {
      // ignore
    }
  }, [filter])

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">My Todos</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          className="border px-4 py-2 rounded flex-1"
          placeholder="Add a todo..."
        />
        <button 
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('all')}
            aria-pressed={filter === 'all'}
          >
            All
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('active')}
            aria-pressed={filter === 'active'}
          >
            Active
          </button>
          <button
            className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setFilter('completed')}
            aria-pressed={filter === 'completed'}
          >
            Completed
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {todos.filter(t => !t.completed).length} items left
        </div>
      </div>
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="border p-3 rounded flex items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              className="mr-2"
            />
            <span className={todo.completed ? "line-through text-gray-400 flex-1" : "flex-1"}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              aria-label="Delete todo"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}