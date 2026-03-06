"use client";

import { FormEvent, useState } from "react";
import type { Priority } from "@/types/todo";

interface TodoFormProps {
  onAddTodo: (title: string, priority: Priority, scheduledTime?: string) => void;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  type TimeOfDay = "morning" | "afternoon";
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [time, setTime] = useState("09:00");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) return;

    const scheduledTime = time || undefined;

    onAddTodo(title, priority, scheduledTime);
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <div className="flex flex-1 flex-col gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요."
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900/20"
        />
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>우선순위</span>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
              {(
                [
                  { value: "low", label: "낮음" },
                  { value: "medium", label: "보통" },
                  { value: "high", label: "높음" },
                ] as const
              ).map((item) => {
                const isActive = priority === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setPriority(item.value)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-slate-50"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span>시간대</span>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5">
              {(
                [
                  { value: "morning", label: "오전" },
                  { value: "afternoon", label: "오후" },
                ] as const
              ).map((item) => {
                const isActive = timeOfDay === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      setTimeOfDay(item.value);
                      setTime(item.value === "morning" ? "09:00" : "14:00");
                    }}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${
                      isActive
                        ? "bg-slate-900 text-slate-50"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="h-7 rounded-md border border-slate-200 bg-white px-2 text-[11px] outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900/20"
            />
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-slate-900 px-4 py-1.5 text-xs sm:text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 sm:w-auto"
      >
        추가
      </button>
    </form>
  );
}
