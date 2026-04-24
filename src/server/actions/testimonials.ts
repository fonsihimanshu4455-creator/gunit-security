"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  company: z.string().optional(),
  quote: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  avatarUrl: z.string().optional(),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export type TestimonialFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    company: formData.get("company") || undefined,
    quote: formData.get("quote"),
    rating: formData.get("rating") ?? 5,
    avatarUrl: formData.get("avatarUrl") || undefined,
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });
}

export async function createTestimonial(
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.testimonial.create({
    data: {
      ...parsed.data,
      company: parsed.data.company || null,
      avatarUrl: parsed.data.avatarUrl || null,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
  redirect("/admin/testimonials");
}

export async function updateTestimonial(
  id: string,
  _prev: TestimonialFormState,
  formData: FormData
): Promise<TestimonialFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.testimonial.update({
    where: { id },
    data: {
      ...parsed.data,
      company: parsed.data.company || null,
      avatarUrl: parsed.data.avatarUrl || null,
    },
  });

  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.testimonial.delete({ where: { id } });
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/", "layout");
}
