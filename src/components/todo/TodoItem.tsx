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
    <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm transition hover:border-slate-300">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onToggle(todo.id)}
          className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
            todo.completed
              ? "border-slate-900 bg-slate-900 text-slate-50"
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
        className="rounded-md px-2.5 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
      >
        삭제
      </button>
    </li>
  )
}