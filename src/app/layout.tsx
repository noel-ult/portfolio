import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { canIndex, isPreview } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "./globals.css";

const title = isPreview ? "Portfolio — preview" : `${portfolio.profile.name} — Software & AI Portfolio`;
const description = isPreview ? "A personal portfolio preview. Owner information and selected work are awaiting review." : portfolio.profile.introduction;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  authors: [{ name: portfolio.profile.name }],
  alternates: { canonical: "/" },
  robots: { index: canIndex, follow: canIndex },
  ...(canIndex ? {
    openGraph: {
      title, description, type: "website", url: "/", siteName: "Noel Biju",
      ...(portfolio.profile.photo ? { images: [{ url: portfolio.profile.photo.src, width: 1200, height: 1600, alt: portfolio.profile.photo.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(portfolio.profile.photo ? { images: [portfolio.profile.photo.src] } : {}) },
  } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
