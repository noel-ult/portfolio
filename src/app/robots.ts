import type { MetadataRoute } from "next";
import { canIndex } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: canIndex ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    ...(canIndex ? { sitemap: new URL("/sitemap.xml", siteUrl).href } : {}),
  };
}
