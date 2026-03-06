 "use client";

import { useEffect, useMemo, useState } from "react";
import { FilterType, Priority, Todo } from "@/types/todo";
import { getTodos, saveTodos } from "@/utils/storage";

export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTodos = getTodos();
    setTodos(storedTodos);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    saveTodos(todos);
  }, [todos, isLoaded]);

  const addTodo = (title: string, priority: Priority, scheduledTime?: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    const now = new Date().toISOString();

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: trimmed,
      completed: false,
      createdAt: now,
      priority,
      scheduledTime,
      completedAt: undefined,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id !== id) return todo;
        const willComplete = !todo.completed;
        return {
          ...todo,
          completed: willComplete,
          completedAt: willComplete ? new Date().toISOString() : undefined,
        };
      })
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    if (filter === "active") {
      return todos.filter((todo) => !todo.completed);
    }

    if (filter === "completed") {
      return todos.filter((todo) => todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completedTodos = todos.filter((todo) => todo.completed);
    const completed = completedTodos.length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    const todayKey = new Date().toISOString().slice(0, 10);
    const todayCompleted = completedTodos.filter(
      (todo) =>
        todo.completedAt && todo.completedAt.slice(0, 10) === todayKey
    ).length;

    const doneDates = new Set(
      completedTodos
        .filter((todo) => todo.completedAt)
        .map((todo) => todo.completedAt!.slice(0, 10))
    );

    let streak = 0;
    const cursor = new Date();

    while (true) {
      const key = cursor.toISOString().slice(0, 10);
      if (doneDates.has(key)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      total,
      completed,
      active,
      progress,
      todayCompleted,
      streak,
    };
  }, [todos]);

  return {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    filteredTodos,
    stats,
  };
}