interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
  progress: number;
}

export default function TodoStats({
  total,
  completed,
  active,
  progress,
}: TodoStatsProps) {
  const cards = [
    { label: "전체", value: total },
    { label: "완료", value: completed },
    { label: "남음", value: active },
    { label: "진행률", value: `${progress}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-slate-200 bg-white px-3 py-3 text-left text-sm"
        >
          <p className="text-[11px] font-medium tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}