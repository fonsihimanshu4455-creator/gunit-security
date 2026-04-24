import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { TestimonialForm } from "../TestimonialForm";

export const metadata: Metadata = { title: "Edit Testimonial" };
export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });
  if (!testimonial) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title={testimonial.name} subtitle="Edit Testimonial" />
      <TestimonialForm initial={testimonial} />
    </div>
  );
}
