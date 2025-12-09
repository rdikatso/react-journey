'use client'
import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Count: {count}</h1>
        <div className="flex flex-col md:flex-row justify-evenly w-full max-w-md gap-4">
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(count + 5)}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Add 5
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            className="bg-yellow-500 px-4 py-2 rounded"
          >
            Decrement
          </button>
          <button 
            onClick={() => setCount(0)}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Reset
          </button>
        </div>
      </div>
    </main>
  )
}
