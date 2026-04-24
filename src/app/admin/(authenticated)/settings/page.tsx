import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Site Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="Site Settings" subtitle="Configuration" />
      <SettingsForm initial={settings} />
    </div>
  );
}
