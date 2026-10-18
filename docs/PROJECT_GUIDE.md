# Portfolio maintenance guide

Use Node.js 24. Run `npm ci`, `npm run dev`; run `npm run build` then `npm start` for a production server. This revision uses standard Next.js on Vercel with incremental regeneration, not static export.

## Source ownership

- `src/content/portfolio.ts` owns approved personal facts, selected project stories, résumé/social URLs and immutable GitHub repository IDs for curated work.
- `src/lib/github.ts` owns server-only GitHub requests, one-hour caching, pagination, complete-result validation and snapshot fallback. `github-model.ts` owns pure validation, eligibility, slug and safe-text/link helpers. `src/content/github-snapshot.json` is the verified public cold-cache fallback.
- `src/app/(site)` owns crawlable content routes and the shared shell. New GitHub projects render on demand at `/projects/[slug]`; curated stories stay available from local content.
- `/enter` owns the entrance. Its component never appears on content routes and never navigates without an explicit activation. No sessionStorage gate, global bootstrap, or idle release belongs in the root layout.
- Shared CSS tokens remain in `src/app/globals.css`; `DESIGN.md` explains the identity and native control decisions.

## GitHub operations

The cache refreshes on the next request after one hour, without a deployment or browser polling. Public-only access needs no token. Optional `GITHUB_TOKEN` belongs only on the server in local/Vercel environment settings. Failed fetches throw inside the validated cache operation; they must not overwrite good cached data. The snapshot makes cold-cache failures readable. Do not add personal skill claims, contribution claims, or performance metrics from inference.

To update the fallback, fetch all public repository pages, normalize them with `normalizeRepositories`, attach safe `readmeExcerpt` text where available, and record the actual `syncedAt`. Never include credentials, private repositories or full API responses. Runtime discovery does not depend on snapshot updates.

## Validation

Run `npm test`, lint, a production build, then type checking and `npm run test:e2e`. The browser suite needs Playwright Chromium (`npx playwright install chromium`) and starts the built app on port 3100 unless `PLAYWRIGHT_BASE_URL` is set. Inspect desktop and mobile renderings and verify:

- `/enter` stays on the entrance after 30 seconds, drag, wheel, resize and backgrounding; tap/click/Enter/Space enters once.
- Reduced motion remains static and actionable; no-JavaScript navigation works.
- `/`, About, Projects, Experience, Contact and project URLs work directly and through links.
- Search, language, clear, load-more, URL restoration, native select keyboard behavior, disclosure and both previews work.
- No console exceptions, horizontal overflow, invalid HTML, incorrect canonicals, broken assets, or accidental overlay/inert content.
- GitHub unavailable/rate-limited responses retain good data or use the labelled fallback.

## Publishing and Google Search

Vercel uses `vercel.json` for headers and legacy redirects. Each page owns its canonical through `pageMetadata`; the root layout must not canonicalize child routes to `/`. Sitemap includes real content, not `/enter`, filter variants, assets or redirects.

After shipping, verify HTTP responses and rendered screenshots before using the signed-in Search Console session to resubmit the sitemap, request indexing of real pages, or restart validation of repaired content URLs. HTTP-to-HTTPS and duplicate canonical exclusions are expected. Font/icon assets do not need page-indexing requests. Google’s reports update after recrawl, not immediately after a deploy.
