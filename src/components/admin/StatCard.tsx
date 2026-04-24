import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  href,
  icon: Icon,
  accent = "red",
}: {
  label: string;
  value: number | string;
  href?: string;
  icon: LucideIcon;
  accent?: "red" | "blue" | "gold";
}) {
  const accentClasses = {
    red: "from-red-primary/20 to-red-deep/10 border-red-primary/30",
    blue: "from-blue-primary/20 to-blue-royal/10 border-blue-primary/30",
    gold: "from-gold-accent/20 to-gold-accent/5 border-gold-accent/30",
  };

  const iconAccent = {
    red: "text-red-bright",
    blue: "text-blue-light",
    gold: "text-gold-accent",
  };

  const content = (
    <div
      className={`bg-gradient-to-br ${accentClasses[accent]} border rounded-2xl p-6 hover:translate-y-[-2px] transition`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs tracking-widest text-gray-mid uppercase">{label}</p>
          <p className="font-display text-5xl tracking-wider mt-2">{value}</p>
        </div>
        <Icon className={`w-6 h-6 ${iconAccent[accent]}`} />
      </div>
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
