import assert from "node:assert/strict";
import test from "node:test";
// Node's strip-types runner needs the explicit extension; Next uses its alias.
// @ts-expect-error allowImportingTsExtensions is unnecessary for application code.
import { loadRepositoryPages, normalizeRepositories, readmeExcerpt, readmeLink, repositorySlug, httpsUrl } from "../src/lib/github-model.ts";

const repo = (name: string, id: number, overrides = {}) => ({ id, name, full_name: `noel-ult/${name}`, private: false, fork: false, archived: false, size: 10, pushed_at: "2026-10-18T10:00:00Z", language: "TypeScript", topics: ["web"], stargazers_count: 2, default_branch: "main", ...overrides });

test("library includes original public code and excludes private, forked, archived, empty, self and profile repositories", () => {
  const result = normalizeRepositories([repo("NewProject", 1), repo("secret", 2, { private: true }), repo("fork", 3, { fork: true }), repo("retired", 4, { archived: true }), repo("empty", 5, { size: 0 }), repo("portfolio", 6), repo("noel-ult", 7)]);
  assert.deepEqual(result.map(item => item.name), ["NewProject"]);
  assert.equal(result[0].sourceUrl, "https://github.com/noel-ult/NewProject");
});

test("sort uses code pushes, preserves repository identity and drops unsafe homepages", () => {
  const result = normalizeRepositories([repo("Older", 1, { pushed_at: "2026-09-01T00:00:00Z" }), repo("Current", 2, { homepage: "javascript:alert(1)" })]);
  assert.equal(result[0].name, "Current");
  assert.equal(result[0].homepage, null);
  assert.equal(repositorySlug(result[0]), "current-2");
  assert.equal(repositorySlug({ id: 2, name: "Renamed_Project" }), "renamed-project-2");
});

test("a second API page is included rather than silently truncating the library", async () => {
  const pages: number[] = [];
  const result = await loadRepositoryPages(async page => {
    pages.push(page);
    return new Response(JSON.stringify([repo(`Page${page}`, page)]), { headers: page === 1 ? { link: '<https://api.github.com/next>; rel="next"' } : {} });
  });
  assert.deepEqual(pages, [1, 2]);
  assert.equal(result.length, 2);
});

test("rate limit or partial-page errors reject, allowing the cache to retain its previous complete result", async () => {
  await assert.rejects(() => loadRepositoryPages(async page => {
    if (page === 2) throw new Error("GitHub request failed (429)");
    return new Response(JSON.stringify([repo("Known", 1)]), { headers: { link: '<https://api.github.com/next>; rel="next"' } });
  }), /429/);
  assert.throws(() => normalizeRepositories({ message: "rate limit" }), /repository list/);
  assert.throws(() => normalizeRepositories([repo("Bad", 1, { pushed_at: "invalid" })]), /date/);
});

test("README excerpts skip badges, navigation, code, and headings and use factual prose", () => {
  const readme = '# TruthLens\n\n[![Python](https://shields.io/badge/python)](https://python.org)\n\n[Developer guide](docs/guide.md) · [Source reference](docs/ref.md) · [Contributing](CONTRIBUTING.md)\n\n```js\nconsole.log("example")\n```\n\n**TruthLens** classifies images using machine learning and provides a browser interface for exploring the results.';
  assert.equal(readmeExcerpt(readme), "TruthLens classifies images using machine learning and provides a browser interface for exploring the results.");
  assert.equal(readmeExcerpt("# Project\n\n![badge](https://shields.io/badge/test)"), null);
});

test("README links resolve safely and script or credential URLs cannot become active", () => {
  const repository = { fullName: "noel-ult/PageRadar", defaultBranch: "main" };
  assert.equal(readmeLink("docs/guide.md", repository), "https://github.com/noel-ult/PageRadar/blob/main/docs/guide.md");
  assert.equal(readmeLink("#features", repository), "https://github.com/noel-ult/PageRadar#features");
  for (const bad of ["javascript:alert(1)", "data:text/html,evil", "https://user:pass@example.com", "http://example.com"]) assert.equal(readmeLink(bad, repository), undefined);
  assert.equal(httpsUrl("https://example.com"), "https://example.com/");
});
