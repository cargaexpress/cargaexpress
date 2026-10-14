---
id: 0007-documentation-site
title: "ADR-0007: Documentation site"
sidebar_position: 8
---

# ADR-0007: Docusaurus on GitHub Pages, in its own repository, in English

**Status:** Accepted

## Context

The documentation of the tower and of the decisions taken in the project needs one public, versioned and easy-to-update home.

## Decision

- **Docusaurus 3** generates a static site from Markdown.
- It lives in its **own repository** in the `cargaexpress` organization (`simulator-docosaurus`), not in the main repository.
- It is published with **GitHub Pages through GitHub Actions** on every push to `main`. AWS S3 is kept only as a documented alternative.
- **All content is written in English.**
- The site address comes from environment variables (`SITE_URL`, `BASE_URL`), so renaming the repository does not break links.

## Consequences

- Publishing is automatic, and the published site is **public**: no confidential information goes in.
- GitHub Pages on a private repository needs a paid plan; the repository is public.
- The repository name contains a typo (`docosaurus`). Fixing it changes the public URL.

## Evidence

`docusaurus.config.js`, `.github/workflows/deploy-pages.yml`, [Deploy to GitHub Pages](../deployment/github-pages.md).
