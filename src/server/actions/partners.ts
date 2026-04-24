"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().optional(),
  website: z.string().url().or(z.literal("")).optional(),
  order: z.coerce.number().int().default(0),
});

export type PartnerFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    name: formData.get("name"),
    logoUrl: formData.get("logoUrl") || undefined,
    website: formData.get("website") || undefined,
    order: formData.get("order") ?? 0,
  });
}

export async function createPartner(
  _prev: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.partner.create({
    data: {
      name: parsed.data.name,
      order: parsed.data.order,
      logoUrl: parsed.data.logoUrl || null,
      website: parsed.data.website || null,
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
  redirect("/admin/partners");
}

export async function updatePartner(
  id: string,
  _prev: PartnerFormState,
  formData: FormData
): Promise<PartnerFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.partner.update({
    where: { id },
    data: {
      name: parsed.data.name,
      order: parsed.data.order,
      logoUrl: parsed.data.logoUrl || null,
      website: parsed.data.website || null,
    },
  });

  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deletePartner(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.partner.delete({ where: { id } });
  }
  revalidatePath("/admin/partners");
  revalidatePath("/", "layout");
}
