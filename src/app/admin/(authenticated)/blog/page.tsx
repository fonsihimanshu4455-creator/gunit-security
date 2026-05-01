import type { Metadata } from "next";
import { Plus, Edit } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { LinkButton } from "@/components/admin/Button";
import { DeleteForm } from "@/components/admin/DeleteForm";
import { deleteBlogPost } from "@/server/actions/blog";

export const metadata: Metadata = { title: "Blog Posts" };
export const dynamic = "force-dynamic";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="p-8 max-w-6xl">
      <PageHeader
        title="Blog Posts"
        subtitle="Content"
        actions={
          <LinkButton href="/admin/blog/new">
            <Plus className="w-3.5 h-3.5" /> New Post
          </LinkButton>
        }
      />

      {posts.length === 0 ? (
        <div className="bg-navy-rich border border-navy-light rounded-2xl p-8 text-center">
          <p className="text-gray-mid mb-4">No blog posts yet.</p>
          <p className="text-xs text-gray-mid max-w-md mx-auto">
            Blog posts give Google more text content to index — every published post
            becomes a new ranking opportunity for long-tail searches.
          </p>
        </div>
      ) : (
        <div className="bg-navy-rich border border-navy-light rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy-mid">
              <tr>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Title
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Slug
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Published
                </th>
                <th className="text-left px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Status
                </th>
                <th className="text-right px-4 py-3 text-xs tracking-widest text-gray-mid font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-light">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-navy-mid/50 transition">
                  <td className="px-4 py-3 font-medium">{p.title}</td>
                  <td className="px-4 py-3 text-gray-mid font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3 text-gray-mid text-xs">
                    {p.publishedAt
                      ? new Date(p.publishedAt).toLocaleDateString("en-AU", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {p.published ? (
                      <span className="text-[10px] tracking-widest text-green-400 bg-green-900/30 px-2 py-0.5 rounded">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="text-[10px] tracking-widest text-gray-mid bg-navy-light px-2 py-0.5 rounded">
                        DRAFT
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-4">
                      <a
                        href={`/admin/blog/${p.id}`}
                        className="inline-flex items-center gap-1 text-blue-light hover:text-blue-royal text-xs"
                      >
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </a>
                      <DeleteForm action={deleteBlogPost} id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
