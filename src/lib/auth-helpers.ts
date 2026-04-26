import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function getSession() {
  return getServerSession(authOptions);
}

/**
 * Require an authenticated ADMIN. CLIENT users get redirected to their
 * own read-only dashboard rather than back to /login (which would loop
 * since they're already signed in).
 */
export async function requireAdmin() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/admin/client-dashboard");
  }
  return session;
}

/**
 * Require any authenticated user (ADMIN or CLIENT). Used by the shared
 * admin shell layout so both roles share the same wrapper but see
 * different sidebar entries / land on different dashboards.
 */
export async function requireAuth() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }
  return session;
}

export function dashboardPathFor(role: string | undefined): string {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "CLIENT") return "/admin/client-dashboard";
  return "/admin/login";
}
