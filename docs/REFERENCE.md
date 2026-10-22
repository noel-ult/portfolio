# Source and configuration reference

## Commands

- `npm run dev`: Next.js development server, webpack.
- `npm run build`: production build and incremental regeneration artifacts.
- `npm start`: standard Next.js production server.
- `npm test`: Node 24 TypeScript contract tests for public GitHub data.
- `npm run test:e2e`: Playwright Chromium desktop/mobile regression tests against a production build, or `PLAYWRIGHT_BASE_URL`.
- `npm run lint`: ESLint.
- `npm run typecheck`: TypeScript using generated Next.js route types.

## Interfaces

`GitHubRepository` contains public identity, name, source/homepage, primary language, topics, stars, last push date and default branch. `normalizeRepositories` validates and filters API pages; `loadRepositoryPages` consumes every linked page before returning a complete result. `CatalogProject` combines repository facts with the approved `Project` story, slug and featured status. `getProjectCatalog` returns projects, featured projects, actual sync date and `github`/`snapshot` source. `getProject` accepts a slug and can match a preserved repository ID after a rename. `getReadme` returns bounded public markdown or null.

A server-only `GITHUB_TOKEN` is optional. `GITHUB_OWNER` is fixed to `noel-ult`; API origins and allowed repository paths cannot be supplied by visitors. Public API pagination is bounded at 20 pages and requests have a 10-second timeout. README traffic uses five parallel workers and one-hour successful-result caching. An HTTP failure is not an empty success.

`pageMetadata` emits page-specific canonical, robots and social metadata. `StructuredData` escapes less-than signs before emitting JSON-LD. README uses `react-markdown` and `remark-gfm`, disables raw HTML, resolves repository-relative links, rejects unsafe schemes/credentials and converts images to links.

## Routes and components

`(site)/layout.tsx` shares header, main landmark, footer and finite heading motion. The route-aware header owns active-page navigation. Home preserves the supplied photograph, hero and featured previews. Projects owns the library; its native language select intentionally uses the platform popup. Search/filter URL state uses native history and subscribes to back/forward changes. Client updates are local and do not issue GitHub requests.

`HomeEntrance` wraps the site shell and mounts the server-rendered entrance only on `/`, with an inert background, explicit in-place reveal and focus restoration. It preserves completed entry across client-side routes without a pathname key; direct inner-page arrivals start as entered. It resets on fresh page loads, so refreshing the homepage replays the entrance. `EntryIntro` shares continuous-line art with `/enter`; a one-navigation, non-persistent handoff prevents replaying after entering there. Reduced motion uses a static path. No automatic timer-to-enter exists. No-JavaScript visitors can read the homepage directly.

`next.config.ts` uses default Next.js runtime behavior. `vercel.json` configures headers and specific legacy redirects, with no static-output override. `src/lib/site.ts` is the canonical production origin; `sitemap.ts` renders from the same hourly catalog cache as the project library. Every project route renders on demand from the same validated cache, including newly discovered repositories.
