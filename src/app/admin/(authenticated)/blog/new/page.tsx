import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { BlogPostForm } from "../BlogPostForm";

export const metadata: Metadata = { title: "New Blog Post" };

export default function NewBlogPostPage() {
  return (
    <div className="p-8 max-w-4xl">
      <PageHeader title="New Blog Post" subtitle="Content · Blog" />
      <BlogPostForm />
    </div>
  );
}
