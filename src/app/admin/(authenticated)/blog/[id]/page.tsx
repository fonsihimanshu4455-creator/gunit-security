import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { BlogPostForm } from "../BlogPostForm";

export const metadata: Metadata = { title: "Edit Blog Post" };
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title={post.title} subtitle="Edit Blog Post" />
      <BlogPostForm initial={post} />
    </div>
  );
}
