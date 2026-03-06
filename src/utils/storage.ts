import { Todo } from "@/types/todo";

const TODO_KEY = "taskflow-todos";

export function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(TODO_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored) as Todo[];
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}