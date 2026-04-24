import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { CoreValueForm } from "../CoreValueForm";

export const metadata: Metadata = { title: "Edit Core Value" };
export const dynamic = "force-dynamic";

export default async function EditCoreValuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const value = await prisma.coreValue.findUnique({ where: { id } });
  if (!value) notFound();

  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title={value.title} subtitle="Edit Core Value" />
      <CoreValueForm initial={value} />
    </div>
  );
}
