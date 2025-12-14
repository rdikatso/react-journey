interface TodoInputProps {
  value: string
  onChange: (value: string) => void
  onAdd: () => void
}

export default function TodoInput({ value, onChange, onAdd }: TodoInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onAdd()
    }
  }

  return (
    <div className="flex gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="border px-4 py-2 rounded flex-1"
        placeholder="Add a todo..."
      />
      <button 
        onClick={onAdd}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  )
}
