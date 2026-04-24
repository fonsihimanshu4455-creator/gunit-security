"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";
import type { ApplicationStatus } from "@prisma/client";

const publicApplicationSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  position: z.string().min(1),
  resumeUrl: z.string().optional(),
  coverLetter: z.string().optional(),
});

export type ApplicationFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitApplication(
  _prev: ApplicationFormState,
  formData: FormData
): Promise<ApplicationFormState> {
  const parsed = publicApplicationSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    position: formData.get("position"),
    resumeUrl: formData.get("resumeUrl") || undefined,
    coverLetter: formData.get("coverLetter") || undefined,
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.careerApplication.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      position: parsed.data.position,
      resumeUrl: parsed.data.resumeUrl || null,
      coverLetter: parsed.data.coverLetter || null,
    },
  });

  return { ok: true, message: "Application submitted. We'll review and be in touch." };
}

const VALID_STATUSES: ApplicationStatus[] = [
  "NEW",
  "REVIEWED",
  "INTERVIEWED",
  "REJECTED",
  "HIRED",
];

export async function updateApplicationStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  const status = formData.get("status");
  if (
    typeof id === "string" &&
    typeof status === "string" &&
    VALID_STATUSES.includes(status as ApplicationStatus)
  ) {
    await prisma.careerApplication.update({
      where: { id },
      data: { status: status as ApplicationStatus },
    });
  }
  revalidatePath("/admin/applications");
  revalidatePath("/admin/dashboard");
}

export async function deleteApplication(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.careerApplication.delete({ where: { id } });
  }
  revalidatePath("/admin/applications");
  revalidatePath("/admin/dashboard");
}
