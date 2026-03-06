"use client";

import { useEffect, useMemo, useState } from "react";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoStats from "@/components/todo/TodoStats";
import useTodos from "@/hooks/useTodos";
import { getDailyNote, saveDailyNote } from "@/utils/storage";

export default function DashboardPage() {
  const {
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    filteredTodos,
    stats,
  } = useTodos();

  const [showTodayOnly, setShowTodayOnly] = useState(false);

  const todayKey = useMemo(
    () => new Date().toISOString().slice(0, 10),
    []
  );
  const [todayNote, setTodayNote] = useState("");

  useEffect(() => {
    setTodayNote(getDailyNote(todayKey));
  }, [todayKey]);

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const displayTodos = useMemo(
    () =>
      showTodayOnly
        ? filteredTodos.filter(
            (todo) => todo.createdAt.slice(0, 10) === todayKey
          )
        : filteredTodos,
    [filteredTodos, showTodayOnly, todayKey]
  );

  const handleChangeTodayNote = (value: string) => {
    setTodayNote(value);
    saveDailyNote(todayKey, value);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">
              오늘의 할 일
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              TaskFlow Dashboard
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              오늘의 우선순위를 정리하고, 진행 상황을 한눈에 확인해 보세요.
            </p>
          </div>
          <p className="text-xs font-medium text-slate-500">
            {today}
          </p>
        </header>

        <TodoStats
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          progress={stats.progress}
          todayCompleted={stats.todayCompleted}
          streak={stats.streak}
        />
        <section className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-600 shadow-sm">
          <p className="mb-2 font-medium text-slate-700">오늘 한 줄 기록</p>
          <input
            type="text"
            value={todayNote}
            onChange={(e) => handleChangeTodayNote(e.target.value)}
            placeholder="오늘 하루를 한 줄로 남겨보세요."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900/20"
          />
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <TodoForm onAddTodo={addTodo} />
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-800">
              할 일 목록
            </h2>
            <div className="flex items-center gap-3">
              <TodoFilter filter={filter} onChangeFilter={setFilter} />
              <button
                type="button"
                onClick={() => setShowTodayOnly((prev) => !prev)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition ${
                  showTodayOnly
                    ? "border-slate-900 bg-slate-900 text-slate-50"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                }`}
              >
                {showTodayOnly ? "오늘만 보기" : "전체 보기"}
              </button>
            </div>
          </div>

          <TodoList
            todos={displayTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </main>
  );
}
