import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { Reveal, RevealStagger } from "@/components/shared/Reveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter((c) => /[A-Za-z]/.test(c))
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TeamPreview({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;

  return (
    <section className="py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <Reveal className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="font-display text-5xl sm:text-7xl tracking-wider">
            Meet The <span className="brand-gradient-text">Team</span>
          </h2>
          <p className="font-serif italic text-xl text-off-white/65 leading-relaxed">
            Strong management. Reliable officers. Personal accountability on every contract.
          </p>
        </Reveal>

        <RevealStagger stagger={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.slice(0, 3).map((member) => (
            <article key={member.id} className="card-luxury rounded-2xl p-8 text-center">
              <div className="flex justify-center mb-5">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={104}
                    height={104}
                    unoptimized
                    className="w-[104px] h-[104px] rounded-full object-cover border-2 border-gold-accent/30"
                  />
                ) : (
                  <div className="w-[104px] h-[104px] rounded-full bg-gradient-to-br from-red-primary to-blue-primary flex items-center justify-center font-display text-3xl tracking-widest border-2 border-gold-accent/30">
                    {initials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl tracking-wider">{member.name}</h3>
              <p className="text-gold-bright text-[10px] tracking-[3px] uppercase mt-2">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-off-white/55 text-sm leading-relaxed mt-5 font-serif italic">
                  {member.bio.length > 130 ? `${member.bio.slice(0, 130)}…` : member.bio}
                </p>
              )}
            </article>
          ))}
        </RevealStagger>

        <div className="text-center mt-14">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 border border-gold-accent/40 hover:border-gold-bright text-off-white text-xs tracking-[3px] uppercase font-medium px-9 py-4 rounded-lg transition"
          >
            Meet Our Full Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
