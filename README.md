# Personal portfolio

A static single-page portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. The brief is in `PORTFOLIO_REQUIREMENTS.md`.

## Run

Use Node.js 24, matching the Vercel build runtime and `.nvmrc`.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production preview:

```sh
npm run build
npm start
```

The `out/` directory can be deployed to a static host. No backend, analytics, contact service, or runtime credentials are needed. Static output follows the [Next.js static export guide](https://nextjs.org/docs/app/guides/static-exports); styling uses the [Tailwind PostCSS integration](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Deploy on Vercel

Import `noel-ult/portfolio` into Vercel or redeploy its existing connected project. Use production branch `main` and repository root `.`. The committed `vercel.json` sets the Next.js framework, `npm ci` install command, `npm run build` build command, and `out` output directory. `package.json` selects Node.js 24. No environment variables are required.

For a custom domain, set the optional `NEXT_PUBLIC_SITE_URL` environment variable to its public HTTPS origin and rebuild. Without it, metadata, robots, and sitemap use the repository’s advertised production URL, `https://portfolio-three-puce-77.vercel.app`. The page includes a favicon, canonical URL, social metadata, and static `robots.txt` and `sitemap.xml`. Search indexing is enabled following the owner’s publication request.

Build configuration follows [Vercel’s project configuration](https://vercel.com/docs/project-configuration/vercel-json). Never upload `node_modules`, `.next`, `out`, `.vercel`, or local environment files to GitHub. The lockfile is committed for reproducible installs; Vercel builds the export itself. Future pushes to the connected production branch trigger Vercel’s Git deployment flow.

## Add your content

Edit **`src/content/portfolio.ts`**. It contains the profile, skills, projects, experience, education, achievements, and contact information, plus the clearly labeled preview copy. The TypeScript types describe all supported fields.

- Replace name, role, introduction, and biography with approved public information.
- List projects in the order you want them featured. Titles, summaries, and contributions appear in a vertical list; native disclosures reveal complete project stories. The first project begins expanded.
- Use `YYYY-MM` or `YYYY-MM-DD` dates. Experience and education sort by start date, most recent first. Omit dates you do not know; unknown dates retain their relative order after dated entries.
- Leave unavailable arrays empty and optional values absent. Skills, education, and achievements appear only when populated.
- In preview mode, Projects and Experience show explicit instructions for missing content. After preview mode is disabled, empty collections and their navigation links are omitted together. This reconciles the brief’s navigation requirement with its instruction to hide empty optional sections.
- Supply public HTTPS links. For a local résumé, place the file in `public/` and use a root-relative path, for example `/resume.pdf`. Ensure the file exists. Invalid links and email addresses are hidden. Links use the current tab.
- Use `contact.email` and `contact.links` for real contact methods. No contact form is included.

## Before publishing

Replace all placeholders, review all claims and public links, then set `publication.hasPlaceholders` to `false`. Only after the owner approves the complete content, set `publication.contentApproved` to `true`.

Until both conditions are met, metadata uses `noindex, nofollow`. A neutral preview title appears while placeholders remain; populated content uses the owner's name. Remaining `[Your ...]` markers also prevent indexing. Do not add secret or private information to the content file; static output is public. The copyright year is captured at build time, so rebuild when the year changes.

The current profile is populated from Noel Biju’s supplied résumé. GitHub links point to `noel-ult` and verified public project sources; LinkedIn points to the supplied profile. The exact résumé is served at `/documents/noel-biju-resume.pdf`. The supplied photograph is optimized as `/profile/noel-biju.webp` and appears in the hero and About section. Profile updates remain local to this content file; the site does not require GitHub credentials or fetch repository data at runtime.

## Project showcases

PageRadar and Choru Vaari Kodukkam are featured first, with compact interactive previews. Set a project's optional `preview` to `"pageradar"` or `"choru-vaari"` in the content file to show its interface. Other projects keep the existing text layout.

The PageRadar preview uses sample updates from its [public demo source](https://github.com/noel-ult/PageRadar/blob/main/app/demo/page.tsx). The Choru Vaari preview uses example inputs and the ratio/verdict logic from its [calculator](https://github.com/noel-ult/chooru-varal/blob/main/lib/calculations/vaariCalculator.ts). Both run locally in the portfolio; they do not connect to monitoring services, cameras, or image analysis. Project descriptions and contributions are based on the public repositories’ documentation. Source links open the full repositories. Choru Vaari's repository homepage returned HTTP 404 during verification, so that deployment link is omitted.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

The page uses semantic landmarks, a skip link, native anchors and keyboard-accessible project disclosures, visible focus rings, responsive layouts, and reduced-motion support. Navigation and complete project notes remain available without JavaScript.

`DESIGN.md` records the visual direction and its mapping to CSS tokens.

## Motion

Afterimage uses CSS 3D transforms and the Web Animations API with no animation dependency. The entrance is an impossible typographic room: pointer movement or touch dragging changes the perspective of its ivory and ember planes. Enter portfolio unfolds the walls and expands the doorway over 1.45 seconds; Skip intro, Escape, or wheel navigation immediately reveals the page. It waits for deliberate entry, runs once per tab session, and bypasses section links, restored scroll positions, reduced motion, forced colors, and failed initialization. Interaction animation stops when the room settles. Blocked session storage does not prevent navigation. Project stories animate inline, and the header identifies the current section after scrolling.

## Artwork

The hero uses the empty dark studio background in `public/art/studio-atmosphere.webp`. The mechanical sculpture, stone slab, and sculpture controls have been removed from the page. Fonts are bundled locally. Background PNGs and their image-edit prompts are retained in `public/art/`.
