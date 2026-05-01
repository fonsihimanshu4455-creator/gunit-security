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
  title: z.string().min(1).max(160),
  excerpt: z.string().min(1).max(300),
  content: z.string().min(1),
  coverUrl: z.string().optional(),
  category: z.string().optional(),
  tags: z.string().optional(),
  metaTitle: z.string().max(160).optional(),
  metaDescription: z.string().max(300).optional(),
  authorName: z.string().optional(),
  readMinutes: z.coerce.number().int().min(1).max(120).default(5),
  published: z.coerce.boolean().default(false),
  publishedAt: z.string().optional(),
});

export type BlogFormState = {
  ok: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

function parse(formData: FormData) {
  return schema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    coverUrl: formData.get("coverUrl") || undefined,
    category: formData.get("category") || undefined,
    tags: formData.get("tags") || undefined,
    metaTitle: formData.get("metaTitle") || undefined,
    metaDescription: formData.get("metaDescription") || undefined,
    authorName: formData.get("authorName") || undefined,
    readMinutes: formData.get("readMinutes") ?? 5,
    published: formData.get("published") === "on",
    publishedAt: formData.get("publishedAt") || undefined,
  });
}

function nullIfEmpty(v: string | undefined): string | null {
  const s = (v ?? "").trim();
  return s === "" ? null : s;
}

function parsePublishedAt(raw: string | undefined, published: boolean): Date | null {
  if (raw && raw.trim()) {
    const d = new Date(raw);
    if (!Number.isNaN(d.getTime())) return d;
  }
  // Auto-stamp publishedAt the first time the post goes live.
  return published ? new Date() : null;
}

export async function createBlogPost(
  _prev: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
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
    await prisma.blogPost.create({
      data: {
        slug: parsed.data.slug,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverUrl: nullIfEmpty(parsed.data.coverUrl),
        category: nullIfEmpty(parsed.data.category),
        tags: nullIfEmpty(parsed.data.tags),
        metaTitle: nullIfEmpty(parsed.data.metaTitle),
        metaDescription: nullIfEmpty(parsed.data.metaDescription),
        authorName: nullIfEmpty(parsed.data.authorName),
        readMinutes: parsed.data.readMinutes,
        published: parsed.data.published,
        publishedAt: parsePublishedAt(parsed.data.publishedAt, parsed.data.published),
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Create failed";
    return { ok: false, message: msg.includes("Unique") ? "Slug already exists." : msg };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updateBlogPost(
  id: string,
  _prev: BlogFormState,
  formData: FormData
): Promise<BlogFormState> {
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
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    // Preserve the original publishedAt once it's been set; only auto-stamp
    // when the post first transitions to published or admin clears the field.
    const publishedAt =
      parsePublishedAt(parsed.data.publishedAt, parsed.data.published) ??
      (parsed.data.published ? existing?.publishedAt ?? new Date() : null);

    await prisma.blogPost.update({
      where: { id },
      data: {
        slug: parsed.data.slug,
        title: parsed.data.title,
        excerpt: parsed.data.excerpt,
        content: parsed.data.content,
        coverUrl: nullIfEmpty(parsed.data.coverUrl),
        category: nullIfEmpty(parsed.data.category),
        tags: nullIfEmpty(parsed.data.tags),
        metaTitle: nullIfEmpty(parsed.data.metaTitle),
        metaDescription: nullIfEmpty(parsed.data.metaDescription),
        authorName: nullIfEmpty(parsed.data.authorName),
        readMinutes: parsed.data.readMinutes,
        published: parsed.data.published,
        publishedAt,
      },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Update failed";
    return { ok: false, message: msg.includes("Unique") ? "Slug already exists." : msg };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${parsed.data.slug}`);
  return { ok: true, message: "Saved." };
}

export async function deleteBlogPost(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string") {
    await prisma.blogPost.delete({ where: { id } });
  }
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
