 "use client";

import { useEffect, useMemo, useState } from "react";
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
        표시할 할 일이 없습니다.
      </div>
    );
  }

  const sortedTodos = useMemo(() => {
    return [...todos].sort((a, b) => {
      if (a.scheduledTime && b.scheduledTime) {
        return a.scheduledTime.localeCompare(b.scheduledTime);
      }
      if (a.scheduledTime && !b.scheduledTime) return -1;
      if (!a.scheduledTime && b.scheduledTime) return 1;
      return a.createdAt.localeCompare(b.createdAt);
    });
  }, [todos]);

  const PAGE_SIZE = 5;
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(sortedTodos.length / PAGE_SIZE));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const pageTodos = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedTodos.slice(start, start + PAGE_SIZE);
  }, [page, sortedTodos]);

  const buckets = useMemo(() => {
    const result: {
      morning: Todo[];
      afternoon: Todo[];
      evening: Todo[];
    } = { morning: [], afternoon: [], evening: [] };

    sortedTodos.forEach((todo) => {
      if (!todo.scheduledTime) return;
      const hour = parseInt(todo.scheduledTime.slice(0, 2), 10);
      if (!Number.isFinite(hour)) return;
      if (hour < 12) result.morning.push(todo);
      else if (hour < 18) result.afternoon.push(todo);
      else result.evening.push(todo);
    });

    return result;
  }, [sortedTodos]);

  const [activeBucket, setActiveBucket] = useState<
    "all" | "morning" | "afternoon" | "evening"
  >("all");

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {pageTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>

      {pageCount > 1 && (
        <div className="flex items-center justify-between text-[11px] text-slate-500">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-full border border-slate-200 px-2 py-1 disabled:opacity-40"
          >
            이전
          </button>
          <span>
            {page} / {pageCount} 페이지
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="rounded-full border border-slate-200 px-2 py-1 disabled:opacity-40"
          >
            다음
          </button>
        </div>
      )}

      {(buckets.morning.length > 0 ||
        buckets.afternoon.length > 0 ||
        buckets.evening.length > 0) && (
        <div className="mt-2 border-t border-slate-100 pt-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-[11px] font-medium text-slate-500">
              시간대별 보기
            </p>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
              {[
                { key: "all" as const, label: "전체" },
                { key: "morning" as const, label: "오전" },
                { key: "afternoon" as const, label: "오후" },
                { key: "evening" as const, label: "저녁" },
              ].map((item) => {
                const isActive = activeBucket === item.key;
                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveBucket(item.key)}
                    className={`rounded-full px-2.5 py-0.5 font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-slate-50"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { key: "morning" as const, label: "오전", list: buckets.morning },
              { key: "afternoon" as const, label: "오후", list: buckets.afternoon },
              { key: "evening" as const, label: "저녁", list: buckets.evening },
            ].map((section) =>
              (activeBucket === "all" || activeBucket === section.key) &&
              section.list.length ? (
                <div
                  key={section.key}
                  className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <p className="mb-1 text-[11px] font-medium text-slate-600">
                    {section.label}
                  </p>
                  <div className="space-y-1 text-[11px] text-slate-600">
                    {section.list.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center justify-between rounded-md bg-white/60 px-2 py-1"
                      >
                        <span className="truncate">{todo.title}</span>
                        {todo.scheduledTime && (
                          <span className="ml-2 shrink-0 text-[10px] text-slate-400">
                            {todo.scheduledTime}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}
