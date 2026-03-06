"use client";

import { FilterType } from "@/types/todo";

interface TodoFilterProps {
  filter: FilterType;
  onChangeFilter: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  { label: "전체", value: "all" },
  { label: "진행중", value: "active" },
  { label: "완료", value: "completed" },
];

export default function TodoFilter({
  filter,
  onChangeFilter,
}: TodoFilterProps) {
  return (
    <div className="inline-flex rounded-full bg-slate-100 p-1">
      {filters.map((item) => {
        const isActive = filter === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChangeFilter(item.value)}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition ${
              isActive
                ? "bg-white text-blue-700 shadow-sm"
                : "bg-transparent text-slate-600 hover:text-slate-800"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
