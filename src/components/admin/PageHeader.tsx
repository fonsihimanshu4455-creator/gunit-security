import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        {subtitle && (
          <p className="text-red-bright tracking-[3px] text-[10px] font-medium">
            {subtitle.toUpperCase()}
          </p>
        )}
        <h1 className="font-display text-5xl tracking-wider mt-1">{title}</h1>
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
}
