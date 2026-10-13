# portfolio source reference


Source reviewed: [`e79d8287c42e`](https://github.com/noel-ult/portfolio/commit/e79d8287c42e52f66de2be7781d240fc6b12f50b).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### package.json

| Script | Shell command |
| --- | --- |
| `dev` | `next dev --webpack` |
| `build` | `next build --webpack` |
| `start` | `serve out -l 3000` |
| `lint` | `eslint .` |
| `typecheck` | `tsc --noEmit` |

Manifest: [package.json](../package.json).

## File-based pages and handlers

- [src/app/page.tsx](../src/app/page.tsx)

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [AGENTS.md](../AGENTS.md)
- [CLAUDE.md](../CLAUDE.md)
- [DESIGN.md](../DESIGN.md)
- [IMPLEMENTATION_PLAN.md](../IMPLEMENTATION_PLAN.md)
- [PORTFOLIO_REQUIREMENTS.md](../PORTFOLIO_REQUIREMENTS.md)
- [README.md](../README.md)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [.env.example](../.env.example)
- [eslint.config.mjs](../eslint.config.mjs)
- [next-env.d.ts](../next-env.d.ts)
- [next.config.ts](../next.config.ts)
- [package.json](../package.json)
- [postcss.config.mjs](../postcss.config.mjs)
- [src/app/globals.css](../src/app/globals.css)
- [src/app/layout.tsx](../src/app/layout.tsx)
- [src/app/page.tsx](../src/app/page.tsx)
- [src/app/robots.ts](../src/app/robots.ts)
- [src/app/sitemap.ts](../src/app/sitemap.ts)
- [src/components/artwork-stage.tsx](../src/components/artwork-stage.tsx)
- [src/components/console-drawer.tsx](../src/components/console-drawer.tsx)
- [src/components/entry-intro.tsx](../src/components/entry-intro.tsx)
- [src/components/entry-thread-art.tsx](../src/components/entry-thread-art.tsx)
- [src/components/page-motion.tsx](../src/components/page-motion.tsx)
- [src/components/portfolio.tsx](../src/components/portfolio.tsx)
- [src/components/project-preview.tsx](../src/components/project-preview.tsx)
- [src/components/project-stories.tsx](../src/components/project-stories.tsx)
- [src/components/site-header.tsx](../src/components/site-header.tsx)
- [src/components/terminal.tsx](../src/components/terminal.tsx)
- [src/content/portfolio.ts](../src/content/portfolio.ts)
- [src/lib/content.ts](../src/lib/content.ts)
- [src/lib/entry-thread.ts](../src/lib/entry-thread.ts)
- [src/lib/site.ts](../src/lib/site.ts)
- [tsconfig.json](../tsconfig.json)
- [vercel.json](../vercel.json)
