import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-sky-50 to-slate-100 px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="rounded-full bg-blue-100/80 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
          Next.js · TypeScript · Tailwind CSS
        </div>

        <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          TaskFlow
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          오늘 해야 할 일을 등록하고, 완료 상태를 관리하며,{" "}
          진행률을 한눈에 확인할 수 있는 간단한 생산성 대시보드입니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-2xl bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            대시보드 시작하기
          </Link>
          <Link
            href="/"
            className="rounded-2xl border border-slate-200 bg-white/70 px-7 py-3 text-base font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-white"
          >
            소개 다시 보기
          </Link>
        </div>
      </div>
    </main>
  );
}