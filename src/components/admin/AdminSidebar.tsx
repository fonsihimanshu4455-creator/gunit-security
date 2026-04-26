"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  LayoutDashboard,
  Settings,
  Shield,
  Building2,
  MessageSquareQuote,
  HeartHandshake,
  Image as ImageIcon,
  Handshake,
  Users,
  Inbox,
  Briefcase,
  Eye,
} from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Shield },
  { href: "/admin/industries", label: "Industries", icon: Building2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/core-values", label: "Core Values", icon: HeartHandshake },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: ImageIcon },
  { href: "/admin/team-members", label: "Team Members", icon: Users },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/submissions", label: "Contact Inbox", icon: Inbox },
  { href: "/admin/applications", label: "Career Applications", icon: Briefcase },
];

const clientLinks = [
  { href: "/admin/client-dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/client-dashboard/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/client-dashboard/applications", label: "Applications", icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;
  const isClient = role === "CLIENT";
  const links = isClient ? clientLinks : adminLinks;

  return (
    <aside className="w-64 bg-navy-rich border-r border-navy-light flex flex-col">
      <div className="p-6 border-b border-navy-light">
        <p className="text-red-bright tracking-[3px] text-[10px] font-medium">
          G UNIT SECURITY
        </p>
        <h2 className="font-display text-2xl tracking-wider mt-1">
          {isClient ? "Client Portal" : "Admin"}
        </h2>
        {isClient && (
          <span className="inline-flex items-center gap-1 mt-2 text-[9px] tracking-[2px] uppercase text-gold-bright">
            <Eye className="w-3 h-3" /> View only
          </span>
        )}
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                active
                  ? "bg-red-primary/15 text-red-bright border-l-2 border-red-bright pl-[10px]"
                  : "text-gray-mid hover:text-off-white hover:bg-navy-mid"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      {isClient && (
        <div className="p-3 border-t border-navy-light">
          <p className="text-[10px] text-gray-dark leading-relaxed px-1">
            Need content changes? Contact your developer.
          </p>
        </div>
      )}
    </aside>
  );
}
