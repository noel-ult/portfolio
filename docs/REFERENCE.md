# portfolio source reference

Source reviewed: [`1fd4a0bc32f1`](https://github.com/noel-ult/portfolio/commit/1fd4a0bc32f1a7142a657b7c178c636d1f16a131).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### package.json

| Script | Shell command |
| --- | --- |
| `dev` | `next dev --webpack` |
| `build` | `next build --webpack` |
| `start` | `next start` |
| `test` | `node --experimental-strip-types --test tests/*.test.ts` |
| `test:e2e` | `playwright test` |
| `lint` | `eslint .` |
| `typecheck` | `tsc --noEmit` |

Manifest: [package.json](../package.json).

## Configuration names

Names below are declared by source or example files. Example-only entries may be stale; consult the linked reader and project guide before relying on them. Secret values are intentionally omitted.

| Name | Declared/read in |
| --- | --- |
| `CI` | [playwright.config.ts](../playwright.config.ts) |
| `GITHUB_TOKEN` | [.env.example](../.env.example), [src/lib/github.ts](../src/lib/github.ts) |
| `PLAYWRIGHT_BASE_URL` | [playwright.config.ts](../playwright.config.ts) |

## File-based pages and handlers

- [src/app/(site)/about/page.tsx](../src/app/%28site%29/about/page.tsx)
- [src/app/(site)/contact/page.tsx](../src/app/%28site%29/contact/page.tsx)
- [src/app/(site)/experience/page.tsx](../src/app/%28site%29/experience/page.tsx)
- [src/app/(site)/page.tsx](../src/app/%28site%29/page.tsx)
- [src/app/(site)/projects/[slug]/page.tsx](../src/app/%28site%29/projects/%5Bslug%5D/page.tsx)
- [src/app/(site)/projects/page.tsx](../src/app/%28site%29/projects/page.tsx)
- [src/app/enter/page.tsx](../src/app/enter/page.tsx)

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [AGENTS.md](../AGENTS.md)
- [CLAUDE.md](../CLAUDE.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [DESIGN.md](../DESIGN.md)
- [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md)
- [PORTFOLIO_REQUIREMENTS.md](../PORTFOLIO_REQUIREMENTS.md)
- [README.md](../README.md)
- [docs/PROJECT_GUIDE.md](../docs/PROJECT_GUIDE.md)
- [docs/REFERENCE.md](../docs/REFERENCE.md)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [.env.example](../.env.example)
- [eslint.config.mjs](../eslint.config.mjs)
- [next-env.d.ts](../next-env.d.ts)
- [next.config.ts](../next.config.ts)
- [package.json](../package.json)
- [playwright.config.ts](../playwright.config.ts)
- [postcss.config.mjs](../postcss.config.mjs)
- [premium-ui.json](../premium-ui.json)
- [src/app/(site)/about/page.tsx](../src/app/%28site%29/about/page.tsx)
- [src/app/(site)/contact/page.tsx](../src/app/%28site%29/contact/page.tsx)
- [src/app/(site)/experience/page.tsx](../src/app/%28site%29/experience/page.tsx)
- [src/app/(site)/layout.tsx](../src/app/%28site%29/layout.tsx)
- [src/app/(site)/not-found.tsx](../src/app/%28site%29/not-found.tsx)
- [src/app/(site)/page.tsx](../src/app/%28site%29/page.tsx)
- [src/app/(site)/projects/[slug]/page.tsx](../src/app/%28site%29/projects/%5Bslug%5D/page.tsx)
- [src/app/(site)/projects/page.tsx](../src/app/%28site%29/projects/page.tsx)
- [src/app/enter/page.tsx](../src/app/enter/page.tsx)
- [src/app/globals.css](../src/app/globals.css)
- [src/app/layout.tsx](../src/app/layout.tsx)
- [src/app/not-found.tsx](../src/app/not-found.tsx)
- [src/app/robots.ts](../src/app/robots.ts)
- [src/app/sitemap.ts](../src/app/sitemap.ts)
- [src/components/artwork-stage.tsx](../src/components/artwork-stage.tsx)
- [src/components/console-drawer.tsx](../src/components/console-drawer.tsx)
- [src/components/entry-intro.tsx](../src/components/entry-intro.tsx)
- [src/components/entry-thread-art.tsx](../src/components/entry-thread-art.tsx)
- [src/components/home-entrance.tsx](../src/components/home-entrance.tsx)
- [src/components/page-heading.tsx](../src/components/page-heading.tsx)
- [src/components/page-motion.tsx](../src/components/page-motion.tsx)
- [src/components/portfolio.tsx](../src/components/portfolio.tsx)
- [src/components/project-library.tsx](../src/components/project-library.tsx)
- [src/components/project-preview.tsx](../src/components/project-preview.tsx)
- [src/components/project-readme.tsx](../src/components/project-readme.tsx)
- [src/components/project-stories.tsx](../src/components/project-stories.tsx)
- [src/components/site-footer.tsx](../src/components/site-footer.tsx)
- [src/components/site-header.tsx](../src/components/site-header.tsx)
- [src/components/structured-data.tsx](../src/components/structured-data.tsx)
- [src/components/terminal.tsx](../src/components/terminal.tsx)
- [src/content/github-snapshot.json](../src/content/github-snapshot.json)
- [src/content/portfolio.ts](../src/content/portfolio.ts)
- [src/lib/content.ts](../src/lib/content.ts)
- [src/lib/entry-navigation.ts](../src/lib/entry-navigation.ts)
- [src/lib/entry-thread.ts](../src/lib/entry-thread.ts)
- [src/lib/github-model.ts](../src/lib/github-model.ts)
- [src/lib/github.ts](../src/lib/github.ts)
- [src/lib/seo.ts](../src/lib/seo.ts)
- [src/lib/site.ts](../src/lib/site.ts)
- [tests/e2e/portfolio.spec.ts](../tests/e2e/portfolio.spec.ts)
- [tests/github.test.ts](../tests/github.test.ts)
- [tsconfig.json](../tsconfig.json)
- [vercel.json](../vercel.json)
