import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { CoreValueForm } from "../CoreValueForm";

export const metadata: Metadata = { title: "New Core Value" };

export default function NewCoreValuePage() {
  return (
    <div className="p-8 max-w-3xl">
      <PageHeader title="New Core Value" subtitle="Content · Core Values" />
      <CoreValueForm />
    </div>
  );
}
