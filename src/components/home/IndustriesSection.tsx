import type { Industry } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal, RevealStagger } from "@/components/shared/Reveal";
import { resolveIcon } from "@/lib/icons";

export function IndustriesSection({ industries }: { industries: Industry[] }) {
  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <SectionLabel>Industries We Serve</SectionLabel>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider">
            Trusted Across <span className="brand-gradient-text">Sectors</span>
          </h2>
        </Reveal>

        <RevealStagger
          stagger={0.07}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {industries.map((industry, i) => {
            const Icon = resolveIcon(industry.icon);
            return (
              <div
                key={industry.id}
                className="group relative card-luxury rounded-2xl p-7 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-primary/5 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-primary/25 to-red-primary/10 flex items-center justify-center mb-7 border border-white/8 group-hover:border-gold-accent/40 transition-colors">
                    <Icon className="w-6 h-6 text-blue-light group-hover:text-gold-bright transition-colors" />
                  </div>
                  <p className="text-[10px] tracking-[4px] text-off-white/40 uppercase mb-3">
                    {String(i + 1).padStart(2, "0")} / {String(industries.length).padStart(2, "0")}
                  </p>
                  <h3 className="font-display text-2xl tracking-wider mb-3 group-hover:gold-gradient-text transition-all">
                    {industry.title}
                  </h3>
                  <p className="text-off-white/60 text-sm leading-relaxed">{industry.description}</p>
                </div>
              </div>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
