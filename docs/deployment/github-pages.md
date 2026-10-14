---
id: github-pages
title: Deploy to GitHub Pages
sidebar_position: 1
---

# Deploy this site to GitHub Pages

The site is published automatically with **GitHub Actions** every time a change is pushed to the `main` branch. Nothing has
to be built or uploaded by hand.

## Site address

```text
https://cargaexpress.github.io/simulator-docosaurus/
```

## Enable it (one time only)

1. On GitHub, open the repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Go to the **Actions** tab. The *Deploy docs to GitHub Pages* workflow runs on every push to `main`. To start it manually,
   open the workflow and click **Run workflow**.
4. When it finishes, the address appears in **Settings → Pages** and in the workflow summary.

:::warning Private repository
GitHub Pages on a **private** repository is only available on paid plans (for example Pro or Team). On the free plan, the
Pages option does not appear or requires the repository to be public. Also, **the published site is public** even if the
repository is private, except on Enterprise plans with private Pages. Do not publish confidential information.
:::

## How it works

The workflow (`.github/workflows/deploy-pages.yml`) installs the dependencies, builds the site with the variables
`SITE_URL=https://cargaexpress.github.io` and `BASE_URL=/simulator-docosaurus/`, and publishes the `build` folder.

## Test the Pages version on your computer

```bash
SITE_URL=https://cargaexpress.github.io BASE_URL=/simulator-docosaurus/ npm run build
npm run serve        # opens http://localhost:3000/simulator-docosaurus/
```

## If something fails

| Symptom | What to check |
|---|---|
| **Pages** does not appear in Settings | The plan does not allow Pages on private repositories |
| The workflow fails at `configure-pages` or `deploy` | That **Source** is set to **GitHub Actions** (step 2) |
| The site opens without styles or with broken links | That `BASE_URL` is `/repository-name/` |
| 404 when opening the address | Wait a couple of minutes after the first deployment |

If the repository is renamed, the address and `BASE_URL` change on their own, because the workflow uses the repository name.
