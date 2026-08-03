import { MetadataRoute } from "next";
import { getJournalPosts, getProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://noelbiju.in";

  const staticRoutes = [
    "",
    "/about",
    "/certificates",
    "/contact",
    "/experience",
    "/failures",
    "/github",
    "/journal",
    "/journey",
    "/now",
    "/projects",
    "/search",
  ].map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1.0 : 0.8,
  }));

  const journalRoutes = getJournalPosts().map((post) => ({
    url: `${base}/journal/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes = getProjects().map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...journalRoutes, ...projectRoutes];
}

