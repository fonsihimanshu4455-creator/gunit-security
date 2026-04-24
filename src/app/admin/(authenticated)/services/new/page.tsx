import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ServiceForm } from "../ServiceForm";

export const metadata: Metadata = { title: "New Service" };

export default function NewServicePage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Service" subtitle="Content · Services" />
      <ServiceForm />
    </div>
  );
}
