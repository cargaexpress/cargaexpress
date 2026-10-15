# CargaExpress Docs

Documentation site for CargaExpress Control Tower, built with [Docusaurus](https://docusaurus.io) 3 and written in English.
It documents the whole control tower: the project, Sprint 1 (design), Sprint 2 (build), architecture, decision records (ADRs)
and the webhook simulator (HU-17).

## Requirements

- Node.js 20 or later

## Local usage

```bash
npm install
npm start            # http://localhost:3000 (reloads on edit)
npm run build        # generates the build/ folder
npm run serve        # serves build/ so you can review it
```

## Publishing

The site is published to GitHub Pages by GitHub Actions every time changes are pushed to `main`
(`.github/workflows/deploy-pages.yml`). One time only, on GitHub: **Settings → Pages → Source → GitHub Actions**.

- Address: `https://cargaexpress.github.io/cargaexpress/`
- The workflow sets `SITE_URL` and `BASE_URL` from the repository name, so renaming the repository changes the address.
- GitHub Pages on a private repository needs a paid plan, and the published site is public: do not add confidential information.
- Pages can take about 10 minutes to refresh after a deploy because of caching.
- `deploy/aws/` and `scripts/` hold an AWS S3 alternative that is **not in use yet**.

## Structure

```
docs/            pages (Markdown)
  project/       problem, user stories, team, costs, pitch, status, sources
  sprint-1/      design: rules, states, architecture v1, data flow, data model, SLA, seed data
  sprint-2/      build: week 1 and week 2
  architecture/  AWS architecture, implemented backend, data model, local development
  decisions/     decision records (ADRs)
  simulator/     documentation for the webhook simulator (HU-17)
src/css/         site colors
static/          logo, favicon, architecture diagram and its draw.io source
.github/         workflow that publishes to GitHub Pages
.githooks/       hook that validates commit messages
```

## Commits

Commits are written in English, use the [Conventional Commits](https://www.conventionalcommits.org) format
`type(scope): description`, are at most 50 characters long, and are made file by file (one clear change per commit, never
`git add .`). Enable the validator once per clone:

```bash
git config core.hooksPath .githooks
```

Allowed types: `feat`, `fix`, `perf`, `build`, `ci`, `docs`, `refactor`, `style`, `test`, `chore`. Use the imperative mood, no
trailing period, and add a body only when the reason for the change is not obvious.
