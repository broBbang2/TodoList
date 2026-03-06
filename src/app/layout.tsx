import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "할 일 관리 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white/95">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-slate-900"
            >
              TaskFlow
            </Link>
            <nav className="flex items-center gap-4 text-xs font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-900">
                소개
              </Link>
              <Link href="/dashboard" className="hover:text-slate-900">
                대시보드
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}