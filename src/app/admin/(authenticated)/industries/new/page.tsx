import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { IndustryForm } from "../IndustryForm";

export const metadata: Metadata = { title: "New Industry" };

export default function NewIndustryPage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Industry" subtitle="Content · Industries" />
      <IndustryForm />
    </div>
  );
}
