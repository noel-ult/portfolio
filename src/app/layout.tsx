import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { canIndex } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "Noel Biju — Software & AI Portfolio", template: "%s — Noel Biju" },
  description: portfolio.profile.introduction,
  authors: [{ name: portfolio.profile.name }],
  robots: { index: canIndex, follow: canIndex },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
