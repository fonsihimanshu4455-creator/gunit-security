import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAuth } from "@/lib/auth-helpers";

export default async function AuthenticatedAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireAuth();

  return (
    <div className="min-h-screen flex bg-navy-deep text-off-white">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader email={session.user.email} role={session.user.role} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
