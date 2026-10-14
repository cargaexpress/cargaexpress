# CargaExpress Docs

Documentation site for CargaExpress Control Tower, built with [Docusaurus](https://docusaurus.io) 3 and written in English.
It documents the whole control tower: architecture, decision records (ADRs), project status, the webhook simulator (HU-17),
site deployment and the commit convention.

## Requirements

- Node.js 20 or later

## Local usage

```bash
npm install
npm start            # http://localhost:3000 (reloads on edit)
npm run build        # generates the build/ folder
npm run serve        # serves build/ so you can review it
```

## Deploy to GitHub Pages

The site is published automatically with GitHub Actions when changes are pushed to `main` (`.github/workflows/deploy-pages.yml`).
One time only, on GitHub: **Settings → Pages → Source → GitHub Actions**. Address: `https://cargaexpress.github.io/cargaexpress/`.

GitHub Pages on private repositories requires a paid plan, and the published site is public. Details in
`docs/deployment/github-pages.md`. As an alternative, `docs/deployment/deploying-to-s3.md` explains how to publish to AWS S3.

## Structure

```
docs/            pages (Markdown)
  architecture/  overview, data model, API reference, local development
  decisions/     decision records (ADRs)
  project/       delivered, pending and open items
  simulator/     documentation for the webhook simulator (HU-17)
  deployment/    how to publish this site (GitHub Pages and an S3 alternative)
  contributing/  commit convention
src/css/         site colors
static/img/      logo and favicon
deploy/aws/      CloudFormation template for the bucket (S3 alternative)
scripts/         S3 deployment script (alternative)
.github/         workflow that publishes to GitHub Pages
.githooks/       hook that validates commit messages
```

## Commits

Commits are written in English, use the `type(scope): description` format, are at most 50 characters long, and are made file by
file. Enable the validator once per clone:

```bash
git config core.hooksPath .githooks
```

Details in `docs/contributing/commit-convention.md`.
