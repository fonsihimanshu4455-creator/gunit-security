"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  Shield,
  Building2,
  MessageSquareQuote,
  HeartHandshake,
  Image as ImageIcon,
  Handshake,
  Inbox,
  Briefcase,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/services", label: "Services", icon: Shield },
  { href: "/admin/industries", label: "Industries", icon: Building2 },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/core-values", label: "Core Values", icon: HeartHandshake },
  { href: "/admin/hero-slides", label: "Hero Slides", icon: ImageIcon },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/submissions", label: "Contact Inbox", icon: Inbox },
  { href: "/admin/applications", label: "Career Applications", icon: Briefcase },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-rich border-r border-navy-light flex flex-col">
      <div className="p-6 border-b border-navy-light">
        <p className="text-red-bright tracking-[3px] text-[10px] font-medium">
          G UNIT SECURITY
        </p>
        <h2 className="font-display text-2xl tracking-wider mt-1">Admin</h2>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
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
    </aside>
  );
}
