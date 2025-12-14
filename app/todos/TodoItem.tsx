interface TodoItemProps {
  id: number
  text: string
  completed: boolean
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="border p-3 rounded flex items-center gap-2">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="mr-2"
      />
      <span className={completed ? "line-through text-gray-400 flex-1" : "flex-1"}>
        {text}
      </span>
      <button
        onClick={() => onDelete(id)}
        className="ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  )
}