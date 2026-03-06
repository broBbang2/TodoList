export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: Priority;
  scheduledTime?: string; // "HH:MM" 형식
  completedAt?: string;
}

export type FilterType = "all" | "active" | "completed";
