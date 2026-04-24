"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  companyName: z.string().min(1),
  tagline: z.string().optional(),
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  hours: z.string().optional(),
  facebookUrl: z.string().url().or(z.literal("")).optional(),
  instagramUrl: z.string().url().or(z.literal("")).optional(),
  linkedinUrl: z.string().url().or(z.literal("")).optional(),
  twitterUrl: z.string().url().or(z.literal("")).optional(),
});

export type SettingsFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function nullIfEmpty(v: FormDataEntryValue | null): string | null {
  const s = typeof v === "string" ? v.trim() : "";
  return s === "" ? null : s;
}

export async function updateSettings(
  _prev: SettingsFormState,
  formData: FormData
): Promise<SettingsFormState> {
  await requireAdmin();

  const parsed = schema.safeParse({
    companyName: formData.get("companyName"),
    tagline: formData.get("tagline") ?? undefined,
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    hours: formData.get("hours") ?? undefined,
    facebookUrl: formData.get("facebookUrl") ?? undefined,
    instagramUrl: formData.get("instagramUrl") ?? undefined,
    linkedinUrl: formData.get("linkedinUrl") ?? undefined,
    twitterUrl: formData.get("twitterUrl") ?? undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = {
    companyName: parsed.data.companyName,
    tagline: nullIfEmpty(formData.get("tagline")),
    phone: parsed.data.phone,
    email: parsed.data.email,
    address: parsed.data.address,
    hours: nullIfEmpty(formData.get("hours")),
    facebookUrl: nullIfEmpty(formData.get("facebookUrl")),
    instagramUrl: nullIfEmpty(formData.get("instagramUrl")),
    linkedinUrl: nullIfEmpty(formData.get("linkedinUrl")),
    twitterUrl: nullIfEmpty(formData.get("twitterUrl")),
  };

  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    await prisma.siteSettings.update({ where: { id: existing.id }, data });
  } else {
    await prisma.siteSettings.create({ data });
  }

  revalidatePath("/admin/settings");
  revalidatePath("/", "layout");
  return { ok: true, message: "Settings saved." };
}
