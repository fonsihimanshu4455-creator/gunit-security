import { redirect } from "next/navigation";
import { dashboardPathFor, requireAuth } from "@/lib/auth-helpers";

export default async function AdminIndexPage() {
  const session = await requireAuth();
  redirect(dashboardPathFor(session.user.role));
}
