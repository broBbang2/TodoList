interface TodoStatsProps {
  total: number;
  completed: number;
  active: number;
  progress: number;
  todayCompleted: number;
  streak: number;
}

export default function TodoStats({
  total,
  completed,
  active,
  progress,
  todayCompleted,
  streak,
}: TodoStatsProps) {
  const cards = [
    { label: "전체", value: total },
    { label: "완료", value: completed },
    { label: "남음", value: active },
    { label: "진행률", value: `${progress}%` },
  ];

  return (
    <div className="space-y-2">
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
      <p className="text-[11px] text-slate-500">
        오늘 완료{" "}
        <span className="font-semibold text-slate-900">
          {todayCompleted}개
        </span>
        , 연속{" "}
        <span className="font-semibold text-slate-900">
          {streak}일
        </span>{" "}
        이상 완료 중
      </p>
    </div>
  );
}