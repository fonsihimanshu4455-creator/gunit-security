"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  order: z.coerce.number().int().default(0),
});

export type CoreValueFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    icon: formData.get("icon"),
    order: formData.get("order") ?? 0,
  });
}

export async function createCoreValue(
  _prev: CoreValueFormState,
  formData: FormData
): Promise<CoreValueFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.coreValue.create({ data: parsed.data });

  revalidatePath("/admin/core-values");
  revalidatePath("/", "layout");
  redirect("/admin/core-values");
}

export async function updateCoreValue(
  id: string,
  _prev: CoreValueFormState,
  formData: FormData
): Promise<CoreValueFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.coreValue.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/core-values");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteCoreValue(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.coreValue.delete({ where: { id } });
  }
  revalidatePath("/admin/core-values");
  revalidatePath("/", "layout");
}
