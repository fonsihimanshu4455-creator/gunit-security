import {
  MapPin,
  Navigation,
  FileText,
  AlertTriangle,
  Monitor,
  CheckCircle,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal } from "@/components/shared/Reveal";

/**
 * G-Force Trinity — subtle product mention placed near the bottom of
 * the home page. Brief, brand-blue-only, no loud gradients. The mockup
 * image lives at `/public/g-force-trinity.png` (a 3-phone composite).
 * Drop a replacement at the same path and Vercel will pick it up on
 * the next deploy.
 */

const FEATURES = [
  {
    icon: MapPin,
    title: "Geo-Fencing Control",
    description:
      "Define secure boundaries for each site. Instant alerts trigger if a guard exits the zone without authorisation.",
  },
  {
    icon: Navigation,
    title: "Live Guard Tracking",
    description:
      "Track guard movement in real time. Patrols are verified, no blind spots left unattended.",
  },
  {
    icon: FileText,
    title: "Instant Reporting",
    description:
      "Incident reports, patrol logs, and updates submitted in-app — all time-stamped and location-verified.",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Panic Alert",
    description:
      "One-touch escalation to management with the guard's live location for rapid response.",
  },
  {
    icon: Monitor,
    title: "24/7 Monitoring Support",
    description:
      "Continuous backend monitoring covering guard welfare, performance, and instant intervention.",
  },
];

const TRUST_POINTS = [
  "Real-time operations transparency",
  "Increased guard accountability",
  "Faster incident response",
  "Reduced operational risks",
  "Complete peace of mind",
];

export function GForceTrinity({
  imageUrl,
  imageWidth,
}: {
  imageUrl?: string | null;
  imageWidth?: number | null;
}) {
  const src = imageUrl || "/g-force-trinity.png";
  const maxWidth = imageWidth ?? 480;
  return (
    <section className="py-24 bg-near-black/50 border-y border-white/8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Content (left on desktop, top on mobile) */}
          <Reveal direction="left" className="space-y-6 order-2 lg:order-1">
            <SectionLabel>Smart Monitoring</SectionLabel>
            <h2 className="font-display text-3xl sm:text-4xl tracking-wider leading-tight">
              G-Force <span className="text-blue-light">Trinity</span> — Smart Guard
              Monitoring & Safety
            </h2>
            <p className="font-serif italic text-base text-blue-light/80">
              We don&apos;t mind 24/7 communication.
            </p>
            <p className="text-off-white/65 text-sm leading-relaxed max-w-xl">
              An advanced security management platform that ensures complete safety of our
              security personnel, real-time operational control, and full transparency for our
              clients. Every guard is backed by a live monitoring system — constant supervision,
              immediate support, reliable communication.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 pt-2">
              {FEATURES.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-3">
                  <span className="w-9 h-9 rounded-lg bg-blue-primary/15 border border-blue-primary/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-light" />
                  </span>
                  <div>
                    <h4 className="text-sm text-off-white">{title}</h4>
                    <p className="text-xs text-off-white/50 leading-relaxed mt-1">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2 pt-3">
              {TRUST_POINTS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-primary/8 border border-blue-primary/20 rounded-full text-xs text-off-white/70"
                >
                  <CheckCircle className="w-3 h-3 text-blue-light flex-shrink-0" />
                  {p}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Image (right on desktop, top on mobile) */}
          <Reveal direction="right" className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] flex items-center justify-center">
              {/* Soft blue halo so the mockup pops on the dark backdrop */}
              <div className="absolute inset-8 bg-blue-primary/10 rounded-full blur-3xl pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="G-Force Trinity app — Live Tracking, dashboard, and Report Details screens"
                style={{ maxWidth: `${maxWidth}px` }}
                className="relative w-full h-full mx-auto object-contain"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
