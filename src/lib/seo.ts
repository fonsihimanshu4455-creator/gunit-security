import type { SiteSettings } from "@prisma/client";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";

// ---- Constants ---------------------------------------------------------

export const COMPANY_NAME_DEFAULT = "G Unit Security";
export const COMPANY_DESCRIPTION_DEFAULT =
  "Premium security services across Perth, Western Australia — VIP protection, crowd control, CCTV, mobile patrols, canine units, financial escorts, concierge and licensed security guards. Fully licensed, $20M insured, 24/7 response.";

// Address fields are kept here (rather than only in DB) so SEO works even
// before the admin has populated SiteSettings. Match what the home page
// shows and the static facts in CLAUDE.md.
export const COMPANY_ADDRESS = {
  streetAddress: "PO BOX 254",
  addressLocality: "Mirrabooka",
  addressRegion: "WA",
  postalCode: "6941",
  addressCountry: "AU",
} as const;

export const COMPANY_GEO = {
  latitude: -31.8788,
  longitude: 115.8605,
} as const;

// ---- Per-page Metadata helpers ----------------------------------------

export type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
};

/**
 * Build a Next `Metadata` object with canonical URL, OpenGraph + Twitter
 * cards already wired up. Use for every public page so social shares
 * and Google index entries are rich and consistent.
 */
export function buildMetadata({ title, description, path = "/", image }: PageMetaInput) {
  const url = absoluteUrl(path);
  const ogImage = image ? (image.startsWith("http") ? image : absoluteUrl(image)) : absoluteUrl("/og-default.png");
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website" as const,
      url,
      siteName: COMPANY_NAME_DEFAULT,
      title,
      description,
      locale: "en_AU",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}

// ---- JSON-LD builders --------------------------------------------------

export function organizationJsonLd(settings: SiteSettings | null) {
  const phone = settings?.phone ?? "+61 426 842 606";
  const email = settings?.email ?? "info@gunitsecurity.com.au";
  const logo = settings?.logoUrl
    ? settings.logoUrl.startsWith("http")
      ? settings.logoUrl
      : absoluteUrl(settings.logoUrl)
    : absoluteUrl("/images/logo.png");
  const sameAs = [
    settings?.facebookUrl,
    settings?.instagramUrl,
    settings?.linkedinUrl,
    settings?.twitterUrl,
  ].filter(Boolean) as string[];

  return {
    "@context": "https://schema.org",
    "@type": "SecurityService",
    "@id": `${SITE_URL}/#organization`,
    name: settings?.companyName ?? COMPANY_NAME_DEFAULT,
    alternateName: "G-Unit Security",
    description: settings?.description ?? COMPANY_DESCRIPTION_DEFAULT,
    url: SITE_URL,
    logo,
    image: logo,
    telephone: phone,
    email,
    foundingDate: "2010",
    address: {
      "@type": "PostalAddress",
      ...COMPANY_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      ...COMPANY_GEO,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Perth, Western Australia" },
      { "@type": "Country", name: "Australia" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
        description: "24/7 emergency response",
      },
    ],
    sameAs,
    knowsAbout: [
      "VIP Protection",
      "Crowd Control",
      "CCTV Monitoring",
      "Mobile Patrols",
      "Canine Security",
      "Financial Escorts",
      "Concierge Services",
      "Security Guards",
    ],
    slogan: settings?.tagline ?? "Your Security, Our Mission",
  };
}

export function websiteJsonLd(settings: SiteSettings | null) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: settings?.companyName ?? COMPANY_NAME_DEFAULT,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-AU",
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function serviceJsonLd(opts: {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "Perth, Western Australia" },
    url: absoluteUrl(`/services/${opts.slug}`),
    ...(opts.imageUrl
      ? { image: opts.imageUrl.startsWith("http") ? opts.imageUrl : absoluteUrl(opts.imageUrl) }
      : {}),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  slug: string;
  publishedAt: Date | null;
  updatedAt: Date;
  authorName: string | null;
  imageUrl?: string | null;
}) {
  const image = opts.imageUrl
    ? opts.imageUrl.startsWith("http")
      ? opts.imageUrl
      : absoluteUrl(opts.imageUrl)
    : absoluteUrl("/og-default.png");
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    image,
    datePublished: (opts.publishedAt ?? opts.updatedAt).toISOString(),
    dateModified: opts.updatedAt.toISOString(),
    author: {
      "@type": "Person",
      name: opts.authorName ?? COMPANY_NAME_DEFAULT,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${opts.slug}`) },
  };
}
