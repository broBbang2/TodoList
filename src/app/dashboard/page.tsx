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
        />
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <TodoForm onAddTodo={addTodo} />
        </section>

        <section className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-800">
              할 일 목록
            </h2>
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
