import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { HeroSlideForm } from "../HeroSlideForm";

export const metadata: Metadata = { title: "Edit Hero Slide" };
export const dynamic = "force-dynamic";

export default async function EditHeroSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const slide = await prisma.heroSlide.findUnique({ where: { id } });
  if (!slide) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title={slide.headline} subtitle="Edit Hero Slide" />
      <HeroSlideForm initial={slide} />
    </div>
  );
}
