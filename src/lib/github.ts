import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { portfolio, type Project } from "@/content/portfolio";
import snapshot from "@/content/github-snapshot.json";
import { GITHUB_OWNER, GITHUB_REFRESH_SECONDS, loadRepositoryPages, readmeExcerpt, repositorySlug, type GitHubRepository } from "@/lib/github-model";

export type CatalogProject = Project & {
  slug: string;
  repository: GitHubRepository | null;
  featured: boolean;
};

function headers(raw = false): HeadersInit {
  return {
    Accept: raw ? "application/vnd.github.raw+json" : "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "noelbiju.in-portfolio",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  };
}

async function request(path: string, raw = false) {
  // unstable_cache owns validated responses; an error must not overwrite good data.
  const response = await fetch(`https://api.github.com/${path}`, { headers: headers(raw), cache: "no-store", signal: AbortSignal.timeout(10000) });
  if (response.status === 404 && raw) return null;
  if (!response.ok) throw new Error(`GitHub request failed (${response.status})`);
  return response;
}

const fetchRepositories = unstable_cache(async () => {
  const repositories = await loadRepositoryPages(async page => {
    const response = await request(`users/${GITHUB_OWNER}/repos?per_page=100&sort=pushed&page=${page}`);
    if (!response) throw new Error("Missing repository response");
    return response;
  });
  return { repositories, syncedAt: new Date().toISOString() };
}, ["github-repositories-v1"], { revalidate: GITHUB_REFRESH_SECONDS, tags: ["github"] });

const fetchReadme = unstable_cache(async (fullName: string) => {
  if (!/^noel-ult\/[A-Za-z0-9_.-]+$/i.test(fullName)) throw new Error("Invalid repository name");
  const response = await request(`repos/${fullName}/readme`, true);
  if (!response) return null;
  return (await response.text()).slice(0, 80000);
}, ["github-readme-v1"], { revalidate: GITHUB_REFRESH_SECONDS, tags: ["github"] });

export const getReadme = cache(async (repository: GitHubRepository) => {
  try { return await fetchReadme(repository.fullName); }
  catch { console.warn(`README unavailable for public repository ${repository.name}`); return null; }
});

export const getProjectCatalog = cache(async () => {
  let source: "github" | "snapshot" = "github";
  let data: { repositories: GitHubRepository[]; syncedAt: string };
  try { data = await fetchRepositories(); }
  catch {
    console.warn("GitHub unavailable; serving the bundled public project snapshot.");
    data = snapshot;
    source = "snapshot";
  }
  const curatedByRepositoryId = new Map(portfolio.projects.filter(project => project.githubRepositoryId).map(project => [project.githubRepositoryId, project]));
  const snapshotById = new Map(snapshot.repositories.map(repository => [repository.id, repository]));
  // Five parallel workers bound cold-cache README traffic; subsequent renders share it.
  const merged: CatalogProject[] = [];
  let next = 0;
  async function worker() {
    while (next < data.repositories.length) {
      const repository = data.repositories[next++];
      const curated = curatedByRepositoryId.get(repository.id);
      let summary = curated?.summary ?? repository.description;
      const saved = snapshotById.get(repository.id);
      // A matching push date means the verified README excerpt is still current.
      // Avoid 25 upstream requests on a cold deploy just to rediscover that fact.
      if (!summary && saved?.pushedAt === repository.pushedAt) summary = saved.excerpt;
      if (!summary) {
        const readme = source === "github" ? await getReadme(repository) : null;
        summary = (readme ? readmeExcerpt(readme) : null) ?? snapshotById.get(repository.id)?.excerpt ?? `${repository.language ?? "Software"} project. Explore the repository and its documentation.`;
      }
      const slug = curated?.id ?? repositorySlug(repository);
      merged.push({
        ...(curated ?? { id: String(repository.id), title: repository.name, summary }),
        summary, slug, repository, featured: curated?.preview !== undefined,
        technologies: curated?.technologies ?? (repository.language ? [repository.language] : []),
        // Read source URLs from the live identity so a repository rename stays current.
        links: [{ label: "Explore project", url: `/projects/${slug}` }, { label: "View source on GitHub", url: repository.sourceUrl }],
      });
    }
  }
  await Promise.all(Array.from({ length: Math.min(5, data.repositories.length) }, worker));
  const knownIds = new Set(merged.map(project => project.githubRepositoryId));
  for (const curated of portfolio.projects) {
    // Curated personal work remains readable even if its repository is unavailable.
    if (curated.githubRepositoryId && knownIds.has(curated.githubRepositoryId)) continue;
    merged.push({ ...curated, slug: curated.id, repository: null, featured: curated.preview !== undefined, links: [{ label: "Explore project", url: `/projects/${curated.id}` }, ...(curated.links ?? [])] });
  }
  merged.sort((a, b) => (b.repository?.pushedAt ?? "").localeCompare(a.repository?.pushedAt ?? "") || a.title.localeCompare(b.title));
  const featured = portfolio.projects.filter(project => project.preview).map(project => merged.find(item => item.id === project.id)).filter((project): project is CatalogProject => !!project);
  return { projects: merged, featured, syncedAt: data.syncedAt, source };
});

export async function getProject(slug: string) {
  const catalog = await getProjectCatalog();
  // The numeric ID preserves incoming links when a non-curated repository is renamed.
  const identity = /-(\d+)$/.exec(slug)?.[1];
  return catalog.projects.find(project => project.slug === slug || (identity && String(project.repository?.id) === identity));
}
