"use client";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoForm from "@/components/todo/TodoForm";
import TodoList from "@/components/todo/TodoList";
import TodoStats from "@/components/todo/TodoStats";
import useTodos from "@/hooks/useTodos";

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

  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              오늘의 할 일
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              TaskFlow Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              오늘의 우선순위를 정리하고, 진행 상황을 한눈에 확인해 보세요.
            </p>
          </div>
          <p className="text-sm font-medium text-slate-500">{today}</p>
        </header>

        <TodoStats
          total={stats.total}
          completed={stats.completed}
          active={stats.active}
          progress={stats.progress}
        />
        <section className="rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
          <TodoForm onAddTodo={addTodo} />
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-slate-800">할 일 목록</h2>
            <TodoFilter filter={filter} onChangeFilter={setFilter} />
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </section>
      </div>
    </main>
  );
}
