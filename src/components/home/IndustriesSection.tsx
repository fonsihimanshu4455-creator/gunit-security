import type { Industry } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { resolveIcon } from "@/lib/icons";

export function IndustriesSection({ industries }: { industries: Industry[] }) {
  return (
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <SectionLabel>Industries We Serve</SectionLabel>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
            Trusted Across <span className="brand-gradient-text">Sectors</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((industry, i) => {
            const Icon = resolveIcon(industry.icon);
            return (
              <div
                key={industry.id}
                className="group relative bg-navy-rich border border-navy-light hover:border-blue-primary/40 rounded-2xl p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(30,58,138,0.5)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/5 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-primary/25 to-red-primary/10 flex items-center justify-center mb-6 border border-navy-light">
                    <Icon className="w-6 h-6 text-blue-light" />
                  </div>
                  <p className="text-xs tracking-[3px] text-gray-mid uppercase mb-2">
                    {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider mb-3">{industry.title}</h3>
                  <p className="text-gray-mid text-sm leading-relaxed">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
