"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export type HeroSlideFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    headline: formData.get("headline"),
    subheadline: formData.get("subheadline"),
    ctaText: formData.get("ctaText") || undefined,
    ctaLink: formData.get("ctaLink") || undefined,
    imageUrl: formData.get("imageUrl") || undefined,
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });
}

export async function createHeroSlide(
  _prev: HeroSlideFormState,
  formData: FormData
): Promise<HeroSlideFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.heroSlide.create({
    data: {
      ...parsed.data,
      ctaText: parsed.data.ctaText || null,
      ctaLink: parsed.data.ctaLink || null,
      imageUrl: parsed.data.imageUrl || null,
    },
  });

  revalidatePath("/admin/hero-slides");
  revalidatePath("/", "layout");
  redirect("/admin/hero-slides");
}

export async function updateHeroSlide(
  id: string,
  _prev: HeroSlideFormState,
  formData: FormData
): Promise<HeroSlideFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.heroSlide.update({
    where: { id },
    data: {
      ...parsed.data,
      ctaText: parsed.data.ctaText || null,
      ctaLink: parsed.data.ctaLink || null,
      imageUrl: parsed.data.imageUrl || null,
    },
  });

  revalidatePath("/admin/hero-slides");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteHeroSlide(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.heroSlide.delete({ where: { id } });
  }
  revalidatePath("/admin/hero-slides");
  revalidatePath("/", "layout");
}
