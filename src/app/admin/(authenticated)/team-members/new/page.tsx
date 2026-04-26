import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { TeamMemberForm } from "../TeamMemberForm";

export const metadata: Metadata = { title: "New Team Member" };

export default function NewTeamMemberPage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Team Member" subtitle="Content · Team Members" />
      <TeamMemberForm />
    </div>
  );
}
