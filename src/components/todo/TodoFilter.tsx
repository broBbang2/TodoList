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
    <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-xs">
      {filters.map((item) => {
        const isActive = filter === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChangeFilter(item.value)}
            className={`rounded-full px-3 py-1 font-medium transition ${
              isActive
                ? "bg-slate-900 text-slate-50"
                : "bg-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
