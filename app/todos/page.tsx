'use client'
import { useState, useEffect } from 'react'
import FilterButton from './FilterButtons'
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'

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
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

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
      
      <TodoInput 
        value={input}
        onChange={setInput}
        onAdd={addTodo}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          <FilterButton
            label="All"
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterButton
            label="Active"
            isActive={filter === 'active'}
            onClick={() => setFilter('active')}
          />
          <FilterButton
            label="Completed"
            isActive={filter === 'completed'}
            onClick={() => setFilter('completed')}
          />
        </div>
        <div className="text-sm text-gray-600">
          {todos.filter(t => !t.completed).length} items left
        </div>
      </div>

      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completed={todo.completed}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </main>
  )
}