// Pure normalization is shared by the server data layer and its contract tests.
export const GITHUB_OWNER = "noel-ult";
export const GITHUB_REFRESH_SECONDS = 3600;

export type GitHubRepository = {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  pushedAt: string;
  sourceUrl: string;
  homepage: string | null;
  defaultBranch: string;
};

export function httpsUrl(value: unknown): string | null {
  if (typeof value !== "string" || value !== value.trim()) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function normalizeRepositories(value: unknown): GitHubRepository[] {
  if (!Array.isArray(value)) throw new Error("GitHub did not return a repository list");
  const repositories: GitHubRepository[] = [];
  for (const raw of value) {
    if (!raw || typeof raw !== "object") throw new Error("Invalid repository record");
    const repo = raw as Record<string, unknown>;
    if (typeof repo.id !== "number" || typeof repo.name !== "string" || typeof repo.full_name !== "string") throw new Error("Invalid repository identity");
    if (!Number.isSafeInteger(repo.id) || repo.id <= 0 || !/^noel-ult\/[A-Za-z0-9_.-]+$/i.test(repo.full_name)) throw new Error("Invalid repository identity");
    const owner = repo.full_name.split("/")[0];
    if (owner.toLowerCase() !== GITHUB_OWNER || repo.private || repo.fork || repo.archived || repo.disabled || typeof repo.size !== "number" || repo.size <= 0 || ["portfolio", GITHUB_OWNER].includes(repo.name.toLowerCase())) continue;
    if (typeof repo.pushed_at !== "string" || !Number.isFinite(Date.parse(repo.pushed_at))) throw new Error("Invalid repository date");
    repositories.push({
      id: repo.id, name: repo.name, fullName: repo.full_name,
      description: typeof repo.description === "string" && repo.description.trim() ? repo.description.trim() : null,
      language: typeof repo.language === "string" ? repo.language : null,
      topics: Array.isArray(repo.topics) ? repo.topics.filter((topic): topic is string => typeof topic === "string") : [],
      stars: typeof repo.stargazers_count === "number" ? repo.stargazers_count : 0,
      pushedAt: repo.pushed_at,
      sourceUrl: `https://github.com/${repo.full_name}`,
      homepage: httpsUrl(repo.homepage),
      defaultBranch: typeof repo.default_branch === "string" ? repo.default_branch : "main",
    });
  }
  return repositories.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt) || a.name.localeCompare(b.name));
}

export async function loadRepositoryPages(request: (page: number) => Promise<{ json(): Promise<unknown>; headers: Pick<Headers, "get"> }>) {
  const records: unknown[] = [];
  let page = 1;
  while (true) {
    const response = await request(page);
    const batch: unknown = await response.json();
    if (!Array.isArray(batch)) throw new Error("Invalid GitHub repository response");
    records.push(...batch);
    if (!response.headers.get("link")?.includes('rel="next"')) return normalizeRepositories(records);
    if (++page > 20) throw new Error("GitHub repository pagination exceeded its safety limit");
  }
}

export function repositorySlug(repository: Pick<GitHubRepository, "id" | "name">) {
  return `${repository.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "repository"}-${repository.id}`;
}

export function readmeExcerpt(markdown: string): string | null {
  const cleaned = markdown.replace(/<!--[\s\S]*?-->/g, "").replace(/```[\s\S]*?```/g, "").replace(/~~~[\s\S]*?~~~/g, "").replace(/!\[[^\]]*\]\([^)]*\)/g, "").replace(/<[^>]*>/g, "");
  const text = cleaned.split(/\n\s*\n/).map(part => part.trim()).filter(part => !/^(?:#|\||[-*+] |\d+\.|\[!|https?:|```)/.test(part) && !/shields\.io|[│├└]/.test(part)).map(part => part.replace(/^>\s?/gm, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*`\\]/g, "").replace(/\s+/g, " ").trim()).find(part => part.length > 55 && part.split(/\s+/).length >= 9 && !/developer guide|source reference|^of course/i.test(part));
  if (!text) return null;
  return text.length > 250 ? `${text.slice(0, 247).replace(/\s+\S*$/, "")}…` : text;
}

export function readmeLink(href: string | undefined, repository: Pick<GitHubRepository, "fullName" | "defaultBranch">) {
  if (!href) return undefined;
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) && !href.startsWith("https:")) return undefined;
  try {
    const branch = encodeURIComponent(repository.defaultBranch);
    const base = href.startsWith("#") ? `https://github.com/${repository.fullName}` : `https://github.com/${repository.fullName}/blob/${branch}/README.md`;
    return httpsUrl(new URL(href, base).href) ?? undefined;
  } catch { return undefined; }
}
