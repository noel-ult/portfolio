# Noel Biju’s portfolio

A Next.js App Router portfolio at **https://noelbiju.in**. Personal information and selected project stories are curated; the public project library refreshes from GitHub without rebuilding the site.

## Run locally

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
```

For production, run `npm run build` followed by `npm start`. The production server uses `next start`, not a static `out/` directory. Vercel detects the Next.js framework automatically.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Directly accessible portfolio homepage and featured projects |
| `/enter` | Optional, deliberate tap/click/keyboard entrance |
| `/about` | Biography, skills, education, recognition, résumé |
| `/projects` | Featured previews and searchable GitHub library |
| `/projects/[slug]` | Project stories, repository metadata and safely rendered README |
| `/experience` | Internship and selected student work |
| `/contact` | Email, social links, availability and résumé |

The entrance is not mounted on content pages. It holds its final drawing until a visitor clicks, taps, or activates its full-surface link with the keyboard. Drag, wheel, resize, visibility changes, timers and storage do not enter. Reduced motion keeps a static, actionable entrance. Without JavaScript, the link still leads home. `/?intro=1` redirects to `/enter` for old replay links.

## GitHub sync

`src/lib/github.ts` fetches public repositories for `noel-ult` on the server, validates complete pagination, and caches successful results for one hour. The next visit after expiry triggers background revalidation; it is not a scheduled job and does not update an already-open tab. New eligible repositories can appear and receive project pages without deployment.

Only public, non-forked, non-archived repositories with content are included; the portfolio and GitHub profile repository are excluded. Most recently pushed code sorts first. GitHub supplies current names, language, topics, stars, homepage, source URL, README and push date. Missing descriptions use a factual README excerpt. PageRadar and Choru Vaari retain their curated stories and labelled sample previews. Personal details and verified contributions stay in `src/content/portfolio.ts`; repository IDs join curated projects to live data so renames do not lose the editorial story. Non-curated URLs contain the stable repository ID and redirect to the latest slug after a rename.

Failed refreshes do not replace cached successful results. `src/content/github-snapshot.json` supplies a bundled public fallback when GitHub is unreachable on a cold cache. The UI distinguishes a fallback snapshot from a live sync. No secrets or private repository fields enter the client bundle. README HTML is disabled, unsafe URL schemes are rejected, and external README images are linked instead of embedded.

An optional **server-only** `GITHUB_TOKEN` raises API rate limits. Public anonymous access works without it. Configure it in Vercel’s environment settings if needed; never use a `NEXT_PUBLIC_` name or commit the value. `.env.example` documents this optional setting. New repository discovery, descriptions and README retrieval share the same cache rather than polling per visitor.

## SEO and hosting

`https://noelbiju.in` is the fixed canonical origin. Each content route has its own title, description, canonical and share metadata. The homepage and all content render without an entrance gate. Person/ProfilePage, project collection and breadcrumb structured data describe real content. Robots allows crawling; `/enter` is `noindex, follow` and is omitted from the sitemap. The hourly sitemap lists canonical content and project URLs, using real GitHub push dates for repository modifications. Search/filter query variants canonicalize to `/projects`.

Vercel preserves permanent redirects from the old production hostname and `/opengraph-image`. Retired search, GitHub, certificates, now and journal URLs redirect to matching project, biography or experience content. `/journal/lessons-etlab-plus` permanently redirects to `/projects/etlab-plus`. Unknown pages and retired content without a matching replacement remain 404s. Baseline response headers protect content types, framing, referrers, and unused permissions.

## Verify

```sh
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
npm audit --omit=dev
```

Tests cover repository eligibility and sorting, pagination and failures, README extraction, stable identities and safe links. `npm run test:e2e` starts the production build on port 3100 and runs Chromium desktop/mobile checks, including the 30-second untouched entrance, deliberate activation, drag suppression, reduced motion, library filters, browser history, direct routes and no-JavaScript behavior. Install Chromium once with `npx playwright install chromium`; set `PLAYWRIGHT_BASE_URL` to test an already running deployment instead. Browser QA must also check project previews, canonical/sitemap/404 behavior, and console/network health. Run type checking after the build has generated route types; avoid running the build and type checker simultaneously.

The interactive project previews use sample data and local calculation controls; they do not monitor sites or access a camera. Photo and résumé were supplied by Noel. Locally bundled fonts and existing artwork preserve the established identity. `DESIGN.md` records the shared visual and navigation contract.

More details: [Maintenance guide](docs/PROJECT_GUIDE.md), [Source reference](docs/REFERENCE.md), and [Contributing](CONTRIBUTING.md).
