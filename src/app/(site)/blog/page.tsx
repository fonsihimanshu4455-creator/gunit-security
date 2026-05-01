import Link from "next/link";
import { ArrowRight, Calendar, Clock, ExternalLink, Facebook, Instagram } from "lucide-react";
import { getPublishedBlogPosts, getSiteSettings } from "@/lib/site-data";
import { PageHero } from "@/components/shared/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog & Security Insights — G-Unit Security Perth",
  description:
    "Latest articles, security insights, and operational updates from G-Unit Security across Perth and Western Australia.",
  path: "/blog",
});

export const revalidate = 600;

function handleFromUrl(url: string | null | undefined): string {
  if (!url) return "gunitsecurity";
  const cleaned = url.replace(/\/+$/, "").split("?")[0].split("/").filter(Boolean);
  return cleaned[cleaned.length - 1] ?? "gunitsecurity";
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    getPublishedBlogPosts(),
    getSiteSettings(),
  ]);
  const igHandle = handleFromUrl(settings?.instagramUrl);
  const fbHandle = handleFromUrl(settings?.facebookUrl);
  const igUrl = settings?.instagramUrl || `https://instagram.com/${igHandle}`;
  const fbUrl = settings?.facebookUrl || `https://facebook.com/${fbHandle}`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHero
        title={
          <>
            Latest <span className="brand-gradient-text">Updates</span>
          </>
        }
        subtitle="Articles, security insights, and stories from the G-Unit team across Perth."
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Blog" }]}
      />

      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {posts.length === 0 ? (
            <div className="card-luxury rounded-2xl p-10 text-center max-w-2xl mx-auto">
              <p className="text-[10px] tracking-[5px] uppercase text-gold-bright mb-3">
                Coming Soon
              </p>
              <h2 className="font-display text-3xl tracking-wider mb-3">
                Articles in production
              </h2>
              <p className="text-off-white/60 text-sm leading-relaxed">
                Our editorial team is preparing in-depth pieces on event security, mobile
                patrols, and the operational realities of running a 24/7 security business
                in Perth. Follow our socials below for live updates in the meantime.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="card-luxury rounded-2xl overflow-hidden group flex flex-col"
                >
                  <div className="aspect-[16/9] bg-navy-mid overflow-hidden border-b border-white/8">
                    {post.coverUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy-mid to-navy-deep">
                        <span className="text-[10px] tracking-[5px] uppercase text-gold-bright/60">
                          G-Unit Security
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {post.category && (
                      <p className="text-[10px] tracking-[3px] uppercase text-gold-bright mb-3">
                        {post.category}
                      </p>
                    )}
                    <h3 className="font-display text-xl tracking-wider leading-snug mb-3 group-hover:text-red-bright transition">
                      {post.title}
                    </h3>
                    <p className="text-sm text-off-white/65 leading-relaxed mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-4 text-[11px] text-off-white/45 pt-4 border-t border-white/8">
                      {post.publishedAt && (
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {post.readMinutes} min read
                      </span>
                      <span className="ml-auto inline-flex items-center gap-1 text-red-bright opacity-0 group-hover:opacity-100 transition">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Live socials remain available below the editorial grid */}
      <section className="py-20 bg-near-black/40 border-t border-white/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[5px] uppercase text-gold-bright mb-3">
              Stay Connected
            </p>
            <h2 className="font-display text-4xl sm:text-5xl tracking-wider">
              Live <span className="brand-gradient-text">Social</span> Feeds
            </h2>
            <p className="font-serif italic text-base text-off-white/60 mt-4 max-w-xl mx-auto">
              Live posts from Instagram and Facebook.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="card-luxury rounded-2xl p-6 md:p-8">
              <header className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600 flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl tracking-wider">Instagram</h3>
                  <p className="text-xs text-off-white/55">@{igHandle}</p>
                </div>
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-off-white/50 hover:text-gold-bright transition"
                  aria-label="Open Instagram profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </header>
              <div className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-pure-black">
                <iframe
                  title="Instagram feed"
                  src={`https://www.instagram.com/${igHandle}/embed`}
                  className="w-full h-full"
                  loading="lazy"
                  scrolling="no"
                  allowTransparency
                />
              </div>
            </article>

            <article className="card-luxury rounded-2xl p-6 md:p-8">
              <header className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-primary flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl tracking-wider">Facebook</h3>
                  <p className="text-xs text-off-white/55">@{fbHandle}</p>
                </div>
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-off-white/50 hover:text-gold-bright transition"
                  aria-label="Open Facebook page"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </header>
              <div className="aspect-square rounded-xl overflow-hidden border border-white/8 bg-pure-black">
                <iframe
                  title="Facebook page"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
                    fbUrl
                  )}&tabs=timeline&width=400&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  className="w-full h-full"
                  loading="lazy"
                  scrolling="no"
                  allowTransparency
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
