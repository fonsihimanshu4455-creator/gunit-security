import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { TeamMemberForm } from "../TeamMemberForm";

export const metadata: Metadata = { title: "Edit Team Member" };
export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title={member.name} subtitle="Edit Team Member" />
      <TeamMemberForm initial={member} />
    </div>
  );
}
