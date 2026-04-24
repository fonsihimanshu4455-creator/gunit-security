import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { HeroSlideForm } from "../HeroSlideForm";

export const metadata: Metadata = { title: "New Hero Slide" };

export default function NewHeroSlidePage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Hero Slide" subtitle="Content · Hero Slides" />
      <HeroSlideForm />
    </div>
  );
}
