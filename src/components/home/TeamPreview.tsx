import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { TeamMember } from "@prisma/client";
import { SectionLabel } from "@/components/shared/SectionLabel";

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
    <section className="py-24">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-5">
          <SectionLabel>Leadership</SectionLabel>
          <h2 className="font-display text-5xl sm:text-6xl tracking-wider">
            Meet The <span className="brand-gradient-text">Team</span>
          </h2>
          <p className="font-serif italic text-lg text-off-white/70">
            Strong management. Reliable officers. Personal accountability on every contract.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.slice(0, 3).map((member) => (
            <article
              key={member.id}
              className="bg-navy-rich border border-navy-light hover:border-red-primary/40 rounded-2xl p-7 text-center transition hover:-translate-y-1"
            >
              <div className="flex justify-center mb-4">
                {member.photoUrl ? (
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={88}
                    height={88}
                    className="rounded-full object-cover border border-navy-light"
                  />
                ) : (
                  <div className="w-[88px] h-[88px] rounded-full bg-gradient-to-br from-red-primary to-blue-primary flex items-center justify-center font-display text-2xl tracking-widest">
                    {initials(member.name)}
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl tracking-wider">{member.name}</h3>
              <p className="text-red-bright text-xs tracking-widest uppercase mt-2">
                {member.role}
              </p>
              {member.bio && (
                <p className="text-gray-mid text-sm leading-relaxed mt-4">
                  {member.bio.length > 130 ? `${member.bio.slice(0, 130)}…` : member.bio}
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 border border-off-white/20 hover:border-off-white/50 text-off-white text-xs tracking-[3px] uppercase font-medium px-7 py-3.5 rounded-lg transition"
          >
            Meet Our Full Team
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
