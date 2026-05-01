import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import {
  getBlogPostBySlug,
  getPublishedBlogPosts,
  getSiteSettings,
} from "@/lib/site-data";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/home/CTASection";
import { BlogPostBody } from "@/components/blog/BlogPostBody";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { prisma } = await import("@/lib/prisma");
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch (err) {
    console.warn("[blog/[slug]] generateStaticParams skipped:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverUrl,
  });
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [post, all, settings] = await Promise.all([
    getBlogPostBySlug(slug),
    getPublishedBlogPosts(),
    getSiteSettings(),
  ]);
  if (!post) notFound();

  const others = all.filter((p) => p.id !== post.id).slice(0, 3);
  const tags = (post.tags ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.metaDescription ?? post.excerpt,
            slug: post.slug,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
            authorName: post.authorName,
            imageUrl: post.coverUrl,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
          { label: post.title },
        ]}
      />

      <article className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          {post.coverUrl && (
            <div className="relative aspect-[16/8] rounded-2xl overflow-hidden border border-white/8 mb-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.coverUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            <div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-off-white/55 pb-6 border-b border-white/8 mb-8">
                {post.category && (
                  <span className="inline-flex items-center gap-1.5 text-gold-bright tracking-[3px] uppercase text-[10px]">
                    {post.category}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(post.publishedAt)}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readMinutes} min read
                </span>
                {post.authorName && (
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    {post.authorName}
                  </span>
                )}
              </div>

              <BlogPostBody content={post.content} />

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/8">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-navy-rich border border-navy-light rounded-full text-xs text-off-white/65"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-white/8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-off-white/65 hover:text-red-bright text-sm transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all posts
                </Link>
              </div>
            </div>

            <aside className="space-y-6 lg:pt-2">
              {others.length > 0 && (
                <div className="bg-navy-rich border border-navy-light rounded-2xl p-6 space-y-3 sticky top-28">
                  <h3 className="font-display text-xl tracking-wider mb-2">
                    More Reading
                  </h3>
                  {others.map((p) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      className="flex items-start justify-between gap-3 py-2.5 text-sm text-off-white/80 hover:text-red-bright transition border-b border-navy-light last:border-b-0"
                    >
                      <span className="leading-snug">{p.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>

      <CTASection settings={settings} />
    </>
  );
}
