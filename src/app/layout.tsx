import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/lib/site-data";
import { SITE_URL, absoluteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  COMPANY_DESCRIPTION_DEFAULT,
  COMPANY_NAME_DEFAULT,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const companyName = settings?.companyName ?? COMPANY_NAME_DEFAULT;
  const description = settings?.description ?? COMPANY_DESCRIPTION_DEFAULT;
  const ogImage = settings?.logoUrl
    ? settings.logoUrl.startsWith("http")
      ? settings.logoUrl
      : absoluteUrl(settings.logoUrl)
    : absoluteUrl("/og-default.png");

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${companyName} — Premium Security Services Perth WA`,
      template: `%s | ${companyName}`,
    },
    description,
    applicationName: companyName,
    keywords: [
      "security services Perth",
      "security guards Perth",
      "VIP protection Perth",
      "crowd control Perth",
      "mobile patrols WA",
      "CCTV monitoring Perth",
      "canine security",
      "financial escorts",
      "concierge security",
      "event security Perth",
      "hotel security Perth",
      "licensed security WA",
      "G Unit Security",
      "G-Unit Security",
      "Mirrabooka security",
    ],
    authors: [{ name: companyName }],
    creator: companyName,
    publisher: companyName,
    category: "Security Services",
    formatDetection: { telephone: true, address: true, email: true },
    alternates: { canonical: SITE_URL },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      url: SITE_URL,
      siteName: companyName,
      title: `${companyName} — Premium Security Services Perth WA`,
      description,
      locale: "en_AU",
      images: [{ url: ogImage, width: 1200, height: 630, alt: companyName }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${companyName} — Premium Security Services Perth WA`,
      description,
      images: [ogImage],
    },
    icons: (() => {
      // Browser tab icon. Prefer the dedicated favicon, but fall back to
      // the site logo so we never serve a default Next/Vercel mark — the
      // app/favicon.ico file is intentionally removed.
      const iconUrl = settings?.faviconUrl ?? settings?.logoUrl;
      return iconUrl
        ? { icon: iconUrl, shortcut: iconUrl, apple: iconUrl }
        : undefined;
    })(),
    verification: {
      google: settings?.googleSiteVerification ?? undefined,
      other: settings?.bingSiteVerification
        ? { "msvalidate.01": settings.bingSiteVerification }
        : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="en-AU"
      className={`${bebas.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-deep text-off-white font-body">
        <JsonLd data={[organizationJsonLd(settings), websiteJsonLd(settings)]} />
        {children}
      </body>
    </html>
  );
}
