"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only"),
  title: z.string().min(1),
  shortDesc: z.string().min(1),
  longDesc: z.string().min(1),
  icon: z.string().min(1),
  imageUrl: z.string().optional(),
  order: z.coerce.number().int().default(0),
  published: z.coerce.boolean().default(true),
});

export type ServiceFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    shortDesc: formData.get("shortDesc"),
    longDesc: formData.get("longDesc"),
    icon: formData.get("icon"),
    imageUrl: formData.get("imageUrl") || undefined,
    order: formData.get("order") ?? 0,
    published: formData.get("published") === "on",
  });
}

export async function createService(
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.service.create({
      data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Create failed";
    return { ok: false, message: msg.includes("Unique") ? "Slug already exists." : msg };
  }

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  redirect("/admin/services");
}

export async function updateService(
  id: string,
  _prev: ServiceFormState,
  formData: FormData
): Promise<ServiceFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.service.update({
      where: { id },
      data: { ...parsed.data, imageUrl: parsed.data.imageUrl || null },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Update failed";
    return { ok: false, message: msg.includes("Unique") ? "Slug already exists." : msg };
  }

  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteService(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.service.delete({ where: { id } });
  }
  revalidatePath("/admin/services");
  revalidatePath("/", "layout");
}
