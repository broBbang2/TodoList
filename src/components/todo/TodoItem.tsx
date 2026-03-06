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
  const priority = todo.priority ?? "medium";

  const priorityStyle =
    priority === "high"
      ? "border-orange-200 bg-orange-50 text-orange-600"
      : priority === "low"
      ? "border-slate-200 bg-slate-50 text-slate-500"
      : "border-blue-200 bg-blue-50 text-blue-600";

  const priorityLabel =
    priority === "high" ? "높음" : priority === "low" ? "낮음" : "보통";

  const timeLabel = todo.scheduledTime ?? "";

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
        <div className="flex flex-col gap-0.5">
          {timeLabel && (
            <span className="text-[11px] text-slate-400">{timeLabel}</span>
          )}
          <span
          className={`text-sm sm:text-base ${
            todo.completed ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {todo.title}
        </span>
        </div>
        <span
          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${priorityStyle}`}
        >
          {priorityLabel}
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