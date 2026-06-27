import type { ReactNode } from "react";

export default function SectionHeader({ title, description, label }: { title: string; description: string; label: string; }) {
  return (
    <div className="mb-10 flex flex-col gap-3">
      <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{label}</span>
      <h2 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h2>
      <p className="max-w-2xl text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
