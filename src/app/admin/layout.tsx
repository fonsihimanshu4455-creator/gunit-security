import type { ReactNode } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { getSession } from "@/lib/auth-helpers";

export default async function AdminRootLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
