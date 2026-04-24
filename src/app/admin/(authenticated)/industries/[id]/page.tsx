import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { IndustryForm } from "../IndustryForm";

export const metadata: Metadata = { title: "Edit Industry" };
export const dynamic = "force-dynamic";

export default async function EditIndustryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const industry = await prisma.industry.findUnique({ where: { id } });
  if (!industry) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title={industry.title} subtitle="Edit Industry" />
      <IndustryForm initial={industry} />
    </div>
  );
}
