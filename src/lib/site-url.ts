// Single source of truth for the public site URL. Used to build canonical
// URLs, OpenGraph image absolute URLs, and the sitemap. Set
// `NEXT_PUBLIC_SITE_URL` in Vercel project env (e.g. https://gunitsecurity.com.au).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gunitsecurity.com.au"
).replace(/\/+$/, "");

export function absoluteUrl(path = "/"): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}
