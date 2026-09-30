import type { MetadataRoute } from "next";
import { canIndex } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return canIndex ? [{ url: siteUrl.href }] : [];
}
