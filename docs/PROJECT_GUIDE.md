# Portfolio maintenance guide

A static single-page portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. The current source lives under `src/`; earlier multi-page portfolio layouts do not describe this revision.

## Run and validate

Use Node.js **24**, matching `.nvmrc` and `package.json`:

```sh
npm ci
npm run dev
```

Visit http://localhost:3000. Before shipping content changes:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` previews the exported `out/` directory on port 3000. It is a static preview command, not `next start`.

## Content and structure

Edit `src/content/portfolio.ts` for profile text, projects, skills, experience, education, achievements, and contacts. `src/components/portfolio.tsx` composes the page; artwork, entry animation, project previews/stories, header, terminal, and console drawer have dedicated components. `src/lib/content.ts`, `site.ts`, and `entry-thread.ts` hold shared content/site/animation support.

Read `PORTFOLIO_REQUIREMENTS.md` and `DESIGN.md` before structural changes; `AGENTS.md` covers framework-specific editing guidance. Image-generation prompt records live under `public/art/` alongside the visual assets. Use the actual licensed assets when publishing.

## Hosting and metadata

`next.config.ts` configures static export. `vercel.json` contains the current Vercel adapter configuration and hostname redirect; keep its `.next` framework-output setting aligned with the existing README rather than substituting the generic static-host output directory. Other static hosts serve `out/`.

The production canonical origin is fixed in `src/lib/site.ts`; robots and sitemap derive from source. No backend, contact-delivery service, database, or runtime secret is required. Editing `.env.example` does not establish an environment-variable contract unless source actually reads it.

## Manual checks

Check entry motion, navigation, project previews, terminal/console controls, contact links, reduced-motion behavior, and narrow-screen layout. There is no automated application test suite in this revision. Verify image paths and metadata after a production build, because a successful development page alone does not exercise static export.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)
