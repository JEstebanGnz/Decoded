"use client";

import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  const router = useRouter();

  return (
    <header className="bg-surface border-b border-border-soft px-5 py-4 flex items-center gap-3">
      <button
        onClick={() => router.back()}
        className="text-sm font-medium text-primary-800 bg-primary-50 border border-primary-200 w-8 h-8 rounded-full flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
      >
        ←
      </button>
      <h1 className="text-[17px] font-semibold text-text-primary tracking-tight">{title}</h1>
    </header>
  );
}