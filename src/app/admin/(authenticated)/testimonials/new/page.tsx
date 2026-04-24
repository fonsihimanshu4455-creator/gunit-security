import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "../TestimonialForm";

export const metadata: Metadata = { title: "New Testimonial" };

export default function NewTestimonialPage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Testimonial" subtitle="Content · Testimonials" />
      <TestimonialForm />
    </div>
  );
}
