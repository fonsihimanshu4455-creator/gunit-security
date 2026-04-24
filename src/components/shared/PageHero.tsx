import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function PageHero({
  title,
  subtitle,
  breadcrumbs,
}: {
  title: ReactNode;
  subtitle?: string;
  breadcrumbs?: { href?: string; label: string }[];
}) {
  return (
    <section className="relative py-24 md:py-32 border-b border-navy-light grid-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-red-primary/10 via-transparent to-blue-primary/10 pointer-events-none" />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
        <div className="max-w-3xl space-y-5">
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1.5 text-xs tracking-wider text-gray-mid">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="w-3 h-3 text-gray-dark" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-red-bright transition">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-off-white/80">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-wider leading-[0.95]">
            {title}
          </h1>
          {subtitle && (
            <p className="font-serif italic text-xl text-off-white/70 max-w-2xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}
