"use client";

import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-blue-100 hover:bg-blue-50/40">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-full border text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
            todo.completed
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white text-transparent"
          }`}
        >
          ✓
        </button>
        <span
          className={`text-sm sm:text-base ${
            todo.completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
      >
        삭제
      </button>
    </li>
  )
}