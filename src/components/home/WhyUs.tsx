import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

const features = [
  { title: "Right Personnel", description: "Quality recruitment with rigorous screening and reliability." },
  { title: "Strong Procedures", description: "Clear expectations and consistent delivery across all sites." },
  { title: "Active Supervision", description: "Supervisor visits and procedure-compliance checks." },
  { title: "24/7 Communication", description: "Always available, always responsive." },
];

export function WhyUs() {
  return (
    <section className="py-24 bg-navy-rich/40 grid-bg">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <svg
              className="w-full max-w-md mx-auto"
              viewBox="0 0 200 240"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bigShield" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c8102e" />
                  <stop offset="50%" stopColor="#8b0000" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <filter id="bigShieldGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M100 20 L170 55 L170 130 Q170 190 100 220 Q30 190 30 130 L30 55 Z"
                fill="url(#bigShield)"
                opacity="0.2"
              />
              <path
                d="M100 20 L170 55 L170 130 Q170 190 100 220 Q30 190 30 130 L30 55 Z"
                fill="none"
                stroke="url(#bigShield)"
                strokeWidth="2"
                filter="url(#bigShieldGlow)"
              />
              <path
                d="M100 40 L155 65 L155 130 Q155 175 100 200 Q45 175 45 130 L45 65 Z"
                fill="none"
                stroke="#c8102e"
                strokeWidth="1.5"
                opacity="0.7"
              />
              <text
                x="100"
                y="145"
                fontFamily="Bebas Neue, sans-serif"
                fontSize="80"
                fill="#ffffff"
                textAnchor="middle"
                fontWeight="bold"
                filter="url(#bigShieldGlow)"
              >
                G
              </text>
              <text
                x="100"
                y="175"
                fontFamily="Arial, sans-serif"
                fontSize="10"
                fill="#c8102e"
                textAnchor="middle"
                letterSpacing="4"
              >
                SECURITY
              </text>
            </svg>
            <div className="mt-6 bg-navy-rich border border-navy-light rounded-2xl p-5 flex items-center gap-4 max-w-sm mx-auto">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-primary to-red-deep flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-display text-xl tracking-wider">Western Australian</h4>
                <p className="text-xs text-gray-mid mt-0.5">
                  Privately owned and locally operated since 2024.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <SectionLabel>Why Choose Us</SectionLabel>
            <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
              Excellence <span className="brand-gradient-text">Built On</span> Trust
            </h2>
            <p className="text-gray-mid text-lg leading-relaxed">
              At G-Unit Security, we focus on the right personnel, strong operational procedures,
              and active management supervision — quality over uncontrolled growth.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 pt-4">
              {features.map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-primary/15 border border-red-primary/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-red-bright" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg tracking-wider">{f.title}</h4>
                    <p className="text-sm text-gray-mid mt-0.5">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-4 bg-gradient-to-r from-red-primary to-red-deep hover:from-red-bright hover:to-red-primary text-white text-xs tracking-[3px] uppercase font-medium px-7 py-3.5 rounded-lg transition shadow-[0_15px_40px_-15px_rgba(200,16,46,0.5)]"
            >
              Learn Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
