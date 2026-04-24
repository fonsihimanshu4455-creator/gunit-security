"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

const publicContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
});

export type ContactFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const parsed = publicContactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    service: formData.get("service") || undefined,
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await prisma.contactSubmission.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service || null,
      message: parsed.data.message,
    },
  });

  return { ok: true, message: "Thanks! We'll be in touch shortly." };
}

export async function markSubmissionRead(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  const read = formData.get("read") === "true";
  if (typeof id === "string") {
    await prisma.contactSubmission.update({ where: { id }, data: { read } });
  }
  revalidatePath("/admin/submissions");
  revalidatePath("/admin/dashboard");
}

export async function deleteSubmission(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.contactSubmission.delete({ where: { id } });
  }
  revalidatePath("/admin/submissions");
  revalidatePath("/admin/dashboard");
}
