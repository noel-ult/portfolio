# portfolio: verification and operations

Reviewed against [default-branch commit 1fd4a0bc32f1](https://github.com/noel-ult/portfolio/commit/1fd4a0bc32f1a7142a657b7c178c636d1f16a131) on 2026-10-28. Start with the [developer guide](PROJECT_GUIDE.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## Portfolio and GitHub discovery

Run the guide’s unit/lint/build/type/browser checks. Verify direct content URLs, entrance activation and focus, project search/filter/history, and a failed GitHub fetch retaining cache or labelled snapshot.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

The current revision uses Next server rendering and regeneration. Keep optional GITHUB_TOKEN server-side. Review canonical URLs and redirects on the published host.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
