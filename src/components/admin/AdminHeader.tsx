"use client";

import { signOut } from "next-auth/react";
import { LogOut, ExternalLink } from "lucide-react";

export function AdminHeader({ email }: { email: string }) {
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
        <span className="text-sm text-gray-mid">{email}</span>
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
