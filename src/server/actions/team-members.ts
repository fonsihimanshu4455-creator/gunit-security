"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const schema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email().or(z.literal("")).optional(),
  phone: z.string().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().optional(),
  // One responsibility per line: "Title — description". Parsed into JSON.
  responsibilities: z.string().optional(),
  order: z.coerce.number().int().default(0),
  isActive: z.coerce.boolean().default(true),
});

export type TeamMemberFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
    email: formData.get("email") || undefined,
    phone: formData.get("phone") || undefined,
    bio: formData.get("bio") || undefined,
    photoUrl: formData.get("photoUrl") || undefined,
    responsibilities: formData.get("responsibilities") || undefined,
    order: formData.get("order") ?? 0,
    isActive: formData.get("isActive") === "on",
  });
}

function responsibilitiesFromText(text: string | undefined): Prisma.InputJsonValue {
  if (!text) return [];
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      // Accept either "Title — description" or "Title - description" or just "Title"
      const split = line.split(/\s[—-]\s/, 2);
      return split.length === 2
        ? { title: split[0].trim(), description: split[1].trim() }
        : { title: line, description: "" };
    });
}

function nullable(v: string | undefined): string | null {
  return v && v.trim() !== "" ? v : null;
}

export async function createTeamMember(
  _prev: TeamMemberFormState,
  formData: FormData
): Promise<TeamMemberFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.teamMember.create({
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
      email: nullable(parsed.data.email),
      phone: nullable(parsed.data.phone),
      bio: nullable(parsed.data.bio),
      photoUrl: nullable(parsed.data.photoUrl),
      order: parsed.data.order,
      isActive: parsed.data.isActive,
      responsibilities: responsibilitiesFromText(parsed.data.responsibilities),
    },
  });

  revalidatePath("/admin/team-members");
  revalidatePath("/", "layout");
  redirect("/admin/team-members");
}

export async function updateTeamMember(
  id: string,
  _prev: TeamMemberFormState,
  formData: FormData
): Promise<TeamMemberFormState> {
  await requireAdmin();
  const parsed = parse(formData);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.teamMember.update({
    where: { id },
    data: {
      name: parsed.data.name,
      role: parsed.data.role,
      email: nullable(parsed.data.email),
      phone: nullable(parsed.data.phone),
      bio: nullable(parsed.data.bio),
      photoUrl: nullable(parsed.data.photoUrl),
      order: parsed.data.order,
      isActive: parsed.data.isActive,
      responsibilities: responsibilitiesFromText(parsed.data.responsibilities),
    },
  });

  revalidatePath("/admin/team-members");
  revalidatePath("/", "layout");
  return { ok: true, message: "Saved." };
}

export async function deleteTeamMember(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.teamMember.delete({ where: { id } });
  }
  revalidatePath("/admin/team-members");
  revalidatePath("/", "layout");
}
