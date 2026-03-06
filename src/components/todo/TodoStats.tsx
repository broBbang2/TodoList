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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl border p-5 shadow-sm ${
            card.label === "진행률"
              ? "border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-white"
              : "border-slate-200 bg-white"
          }`}
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {card.label}
          </p>
          <p className="mt-2 text-2xl font-bold text-slate-800">{card.value}</p>
        </div>
      ))}
    </div>
  );
}