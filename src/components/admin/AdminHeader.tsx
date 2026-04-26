"use client";

import { signOut } from "next-auth/react";
import { LogOut, ExternalLink } from "lucide-react";

export function AdminHeader({ email, role }: { email: string; role?: string }) {
  const isClient = role === "CLIENT";

  return (
    <header className="h-16 bg-navy-rich border-b border-navy-light flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-gray-mid hover:text-off-white transition"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          View Site
        </a>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span
            className={`px-2 py-0.5 rounded text-[10px] tracking-widest uppercase font-medium ${
              isClient
                ? "bg-gold-accent/15 text-gold-bright border border-gold-accent/30"
                : "bg-red-primary/15 text-red-bright border border-red-primary/30"
            }`}
          >
            {isClient ? "Client" : "Admin"}
          </span>
          <span className="text-gray-mid">{email}</span>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex items-center gap-1.5 text-sm text-gray-mid hover:text-red-bright transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          Sign out
        </button>
      </div>
    </header>
  );
}
