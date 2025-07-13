'use client'

import { Todo } from '@/lib/types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number, completed: boolean) => void
  onDelete: (id: number) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, !todo.completed)}
        className="w-5 h-5 cursor-pointer"
      />
      <span 
        className={`flex-1 ${
          todo.completed 
            ? 'line-through text-gray-500' 
            : 'text-gray-900'
        }`}
      >
        {todo.title}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
      >
        削除
      </button>
    </div>
  )
}