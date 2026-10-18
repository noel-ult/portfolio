import type { MetadataRoute } from "next";
import { canIndex } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import { getProjectCatalog } from "@/lib/github";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!canIndex) return [];
  const { projects } = await getProjectCatalog();
  return [
    ...["/", "/about", "/projects", "/experience", "/contact"].map(path => ({ url: new URL(path, siteUrl).href })),
    ...projects.map(project => ({ url: new URL(`/projects/${project.slug}`, siteUrl).href, ...(project.repository ? { lastModified: project.repository.pushedAt } : {}) })),
  ];
}
