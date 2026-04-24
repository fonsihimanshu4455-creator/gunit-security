import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { PartnerForm } from "../PartnerForm";

export const metadata: Metadata = { title: "Edit Partner" };
export const dynamic = "force-dynamic";

export default async function EditPartnerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title={partner.name} subtitle="Edit Partner" />
      <PartnerForm initial={partner} />
    </div>
  );
}
