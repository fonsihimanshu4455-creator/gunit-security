"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { SiteSettings, Testimonial } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

type MarqueeSettings = Pick<
  SiteSettings,
  "testimonialSpeed" | "testimonialDirection" | "testimonialPauseOnHover"
>;

const DEFAULTS: MarqueeSettings = {
  testimonialSpeed: 60,
  testimonialDirection: "left",
  testimonialPauseOnHover: true,
};

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Testimonials({
  items,
  settings,
}: {
  items: Testimonial[];
  settings?: MarqueeSettings | null;
}) {
  const cfg = { ...DEFAULTS, ...(settings ?? {}) };
  const [paused, setPaused] = useState(false);
  if (items.length === 0) return null;

  // Triple the list so the loop seam isn't visible at any viewport width.
  const cards = [...items, ...items, ...items];

  // direction "left"  → cards flow leftward (right-to-left reading): x: 0 → -50%
  // direction "right" → cards flow rightward (left-to-right reading): x: -50% → 0%
  const animateX =
    cfg.testimonialDirection === "right" ? ["-50%", "0%"] : ["0%", "-50%"];

  return (
    <section className="py-32 bg-near-black overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <SectionLabel>Client Testimonials</SectionLabel>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider">
            Words From <span className="brand-gradient-text">Our Clients</span>
          </h2>
        </Reveal>
      </div>

      <div
        className="relative"
        onMouseEnter={() => cfg.testimonialPauseOnHover && setPaused(true)}
        onMouseLeave={() => cfg.testimonialPauseOnHover && setPaused(false)}
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-near-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-near-black to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: animateX }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: paused ? 9999 : cfg.testimonialSpeed,
              ease: "linear",
            },
          }}
          className="flex gap-5 items-stretch w-max"
        >
          {cards.map((t, i) => (
            <article
              key={`${t.id}-${i}`}
              className="relative card-luxury rounded-2xl p-8 w-[340px] md:w-[400px] flex-shrink-0 flex flex-col"
            >
              <span className="absolute top-3 right-6 font-display text-8xl text-gold-accent/15 leading-none">
                &ldquo;
              </span>
              <div className="flex items-center gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-gold-accent text-gold-accent" />
                ))}
              </div>
              <p className="text-off-white/85 leading-relaxed mb-7 relative font-serif italic flex-1">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-5 border-t border-white/8">
                {t.avatarUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-primary to-blue-primary flex items-center justify-center font-display text-sm tracking-widest">
                    {initials(t.name)}
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-off-white text-sm">{t.name}</h4>
                  <p className="text-xs text-off-white/50">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
