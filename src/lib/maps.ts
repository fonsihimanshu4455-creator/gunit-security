import type { SiteSettings } from "@prisma/client";

/**
 * URL the user is sent to when they click an address line in the footer,
 * CTA, or contact page. The admin panel's "Google Maps Link" field is
 * the source of truth — whatever they paste (share.google/…, /maps/place
 * /…, an embed URL, even a full <iframe> snippet) we honour it.
 *
 * Fallback when nothing is set in admin: a Google Maps search URL built
 * from the saved address so the marker still drops on the right place.
 */
export function mapClickUrl(settings: SiteSettings | null): string {
  const raw = settings?.mapEmbedUrl?.trim();
  if (raw) {
    // If admin pasted a full <iframe ... src="…"> snippet, extract the src.
    const iframeMatch = raw.match(/<iframe[^>]+src=["']([^"']+)["']/i);
    if (iframeMatch) return iframeMatch[1];
    // Plain URL — use as-is.
    if (/^https?:\/\//i.test(raw)) return raw;
  }
  const query = encodeURIComponent(settings?.address ?? "Perth WA 6000");
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Strict iframe-source resolver. Only returns a value when the admin's
 * pasted URL is the one form Google reliably allows inside an iframe —
 * `https://www.google.com/maps/embed?pb=…` (or the same URL wrapped in
 * a full <iframe> snippet). Any other form (share.google shortlinks,
 * /maps/place links, search URLs, q=&output=embed hacks) is rejected
 * by Google with a broken-document response, so we return null and the
 * caller renders a clean address card instead.
 */
export function mapIframeSrc(settings: SiteSettings | null): string | null {
  const raw = settings?.mapEmbedUrl?.trim();
  if (!raw) return null;
  const iframeMatch = raw.match(/<iframe[^>]+src=["']([^"']+)["']/i);
  if (iframeMatch && /\/maps\/embed\?pb=/i.test(iframeMatch[1])) {
    return iframeMatch[1];
  }
  if (/\/maps\/embed\?pb=/i.test(raw)) return raw;
  return null;
}

/**
 * Driving-directions URL — used by the "Get directions" link. We always
 * build this from the address (not the admin map link) since the
 * directions API needs a plain destination string.
 */
export function directionsUrl(address: string | null | undefined): string {
  const query = encodeURIComponent(address ?? "Perth WA 6000");
  return `https://www.google.com/maps/dir/?api=1&destination=${query}`;
}
