import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 md:flex-row md:items-center md:justify-between">
        <section className="max-w-xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
            오늘 할 일을 가볍게 정리하세요
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              할 일을 쌓지 말고,
              <br />
              한 곳에서 정리하세요.
            </h1>
            <p className="text-sm leading-7 text-slate-600 sm:text-base">
              TaskFlow는 오늘 해야 할 일을 빠르게 적고, 완료 여부와 진행률을
              한눈에 볼 수 있는 가벼운 대시보드입니다. 복잡한 기능 없이, 매일
              열어서 체크하기 좋은 수준으로만 담았습니다.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-slate-600 sm:flex-row sm:items-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-medium text-yellow-100 transition hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              대시보드 시작하기
            </Link>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
              <span>로컬 스토리지 저장</span>
              <span>·</span>
              <span>완료/진행중 필터링</span>
              <span>·</span>
              <span>진행률 한눈에 확인</span>
            </div>
          </div>
        </section>

        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <p className="text-xs font-medium text-slate-500">오늘의 할 일</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-600">
              예시 화면
            </span>
          </div>
          <div className="mt-3 space-y-3 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2">
              <span className="text-slate-700">디자인 정리</span>
              <span className="text-[11px] text-emerald-600">완료</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2">
              <span className="text-slate-700">오늘 할 일 정리하기</span>
              <span className="text-[11px] text-slate-500">진행중</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2">
              <span className="text-slate-700">내일 일정 미리 적어두기</span>
              <span className="text-[11px] text-slate-400">대기중</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-2">
              <p className="text-[10px] uppercase tracking-wide">전체</p>
              <p className="mt-1 text-base font-semibold text-slate-900">3</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-2">
              <p className="text-[10px] uppercase tracking-wide">완료</p>
              <p className="mt-1 text-base font-semibold text-slate-900">1</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-2">
              <p className="text-[10px] uppercase tracking-wide">진행률</p>
              <p className="mt-1 text-base font-semibold text-slate-900">33%</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}