import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { PartnerForm } from "../PartnerForm";

export const metadata: Metadata = { title: "New Partner" };

export default function NewPartnerPage() {
  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="New Partner" subtitle="Content · Partners" />
      <PartnerForm />
    </div>
  );
}
