"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Partner, SiteSettings } from "@prisma/client";

type MarqueeSettings = Pick<
  SiteSettings,
  "marqueeSpeed" | "marqueeDirection" | "marqueePauseOnHover" | "logoMaxWidth" | "logoMaxHeight"
>;

const DEFAULTS: MarqueeSettings = {
  marqueeSpeed: 40,
  marqueeDirection: "left",
  marqueePauseOnHover: true,
  logoMaxWidth: 150,
  logoMaxHeight: 80,
};

export function TrustBar({
  partners,
  settings,
}: {
  partners: Partner[];
  settings?: MarqueeSettings | null;
}) {
  const cfg = { ...DEFAULTS, ...(settings ?? {}) };
  const active = partners.filter((p) => p.isActive !== false);
  const [paused, setPaused] = useState(false);

  if (active.length === 0) return null;

  // Triple the list so the loop seam isn't visible.
  const items = [...active, ...active, ...active];

  return (
    <section className="py-16 bg-near-black border-y border-white/8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-10 text-center">
        <p className="text-[10px] tracking-[5px] uppercase text-gold-bright mb-3">
          Trusted by Industry Leaders
        </p>
        <h2 className="font-serif italic text-3xl md:text-4xl text-off-white/90">
          Our Distinguished Clients
        </h2>
      </div>

      <div
        className="relative"
        onMouseEnter={() => cfg.marqueePauseOnHover && setPaused(true)}
        onMouseLeave={() => cfg.marqueePauseOnHover && setPaused(false)}
      >
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-near-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-near-black to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: cfg.marqueeDirection === "right" ? ["-50%", "0%"] : ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              // When paused, freeze by setting an effectively-infinite duration.
              duration: paused ? 9999 : cfg.marqueeSpeed,
              ease: "linear",
            },
          }}
          className="flex gap-10 items-center w-max"
        >
          {items.map((p, i) => {
            const w = p.width ?? cfg.logoMaxWidth;
            const h = p.height ?? cfg.logoMaxHeight;
            return (
              <div
                key={`${p.id}-${i}`}
                style={{ width: `${w}px`, height: `${h}px` }}
                className="flex-shrink-0 flex items-center justify-center bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold-accent/40 rounded-xl p-3 transition-all hover:scale-105 hover:bg-white/10"
              >
                {p.logoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={p.logoUrl}
                    alt={p.name}
                    className="max-w-full max-h-full object-contain opacity-80 hover:opacity-100 transition"
                  />
                ) : (
                  <span className="font-display text-lg tracking-[3px] text-off-white/60 text-center px-2">
                    {p.name}
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
