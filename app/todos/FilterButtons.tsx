interface FilterButtonProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export default function FilterButton({ label, isActive, onClick }: FilterButtonProps) {
  return (
    <button
      className={`px-3 py-1 rounded ${
        isActive ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
      }`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  )
}
