import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { siteUrl } from "@/lib/site";
import { canIndex } from "@/lib/content";

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

export function pageMetadata(title: string, description: string, path: string, index = true): Metadata {
  const image = { url: absoluteUrl("/profile/noel-biju.webp"), width: 1200, height: 1600, alt: portfolio.profile.photo?.alt };
  return {
    title, description,
    alternates: { canonical: absoluteUrl(path) },
    robots: { index: canIndex && index, follow: canIndex },
    openGraph: { title: `${title} — Noel Biju`, description, url: absoluteUrl(path), siteName: "Noel Biju", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: `${title} — Noel Biju`, description, images: [image.url] },
  };
}

export function breadcrumbData(items: { label: string; href: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.label, item: absoluteUrl(item.href) })) };
}
