import { Todo } from "@/types/todo";

const TODO_KEY = "taskflow-todos";

export function getTodos(): Todo[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(TODO_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored) as Partial<Todo>[];

    return parsed.map((todo) => ({
      id: todo.id ?? crypto.randomUUID(),
      title: todo.title ?? "",
      completed: todo.completed ?? false,
      createdAt: todo.createdAt ?? new Date().toISOString(),
      priority: todo.priority ?? "medium",
      scheduledTime: todo.scheduledTime,
      completedAt: todo.completedAt,
    }));
  } catch {
    return [];
  }
}

export function saveTodos(todos: Todo[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

const NOTE_KEY = "taskflow-daily-notes";

function loadNotes(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(NOTE_KEY);
  if (!stored) return {};
  try {
    const parsed = JSON.parse(stored) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, string>;
    }
    return {};
  } catch {
    return {};
  }
}

export function getDailyNote(dateKey: string): string {
  const notes = loadNotes();
  return notes[dateKey] ?? "";
}

export function saveDailyNote(dateKey: string, note: string) {
  if (typeof window === "undefined") return;
  const notes = loadNotes();
  const trimmed = note.trim();

  if (trimmed) {
    notes[dateKey] = trimmed;
  } else {
    delete notes[dateKey];
  }

  localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
}