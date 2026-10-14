---
id: deploying-to-s3
title: Alternative - deploy to S3
sidebar_position: 2
---

# Alternative: deploy this site to AWS S3

:::note
The main deployment is [GitHub Pages](./github-pages.md). This guide is kept as an alternative in case AWS is preferred one day.
:::

The site is static (Docusaurus), so it is published to an S3 bucket with website hosting. There are no running servers and the
cost is minimal.

:::warning The site becomes public
The documentation will be visible to anyone with the address. Do not publish confidential information. The S3 address uses
**HTTP**; for HTTPS and a custom domain, CloudFront can be added later.
:::

## Requirements

- Node.js 20 or later.
- AWS CLI configured (`aws configure`) with S3 and CloudFormation permissions.
- A unique bucket name, for example `cargaexpress-docs-YOURNAME`.

## Step by step

### 1. Test the site on your computer

```bash
npm install
npm start          # http://localhost:3000
```

### 2. Create the bucket (one time only)

```bash
aws cloudformation deploy \
  --template-file deploy/aws/site-bucket.yaml \
  --stack-name cargaexpress-docs \
  --parameter-overrides BucketName=cargaexpress-docs-YOURNAME \
  --region us-east-2
```

When it finishes, the site's public address appears in the stack's `SiteUrl` output:

```bash
aws cloudformation describe-stacks --stack-name cargaexpress-docs --region us-east-2 \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" --output text
```

### 3. Configure the variables

Copy `.env.example` to `.env.local` and fill in the values (this file is not committed to the repository):

```text
SITE_URL=http://cargaexpress-docs-YOURNAME.s3-website.us-east-2.amazonaws.com
BASE_URL=/
S3_BUCKET=cargaexpress-docs-YOURNAME
AWS_REGION=us-east-2
```

### 4. Publish

```bash
npm run deploy:s3
```

The script builds the site and syncs it with the bucket. On Windows, run it from **Git Bash** or WSL.

### 5. Open the site

Open the `SiteUrl` address in the browser.

## Updating

Every time you change the documentation, run `npm run deploy:s3` again.

## Tearing everything down

```bash
aws s3 rm s3://cargaexpress-docs-YOURNAME --recursive
aws cloudformation delete-stack --stack-name cargaexpress-docs --region us-east-2
```

## If something fails

| Symptom | What to check |
|---|---|
| `S3_BUCKET is required` | Create `.env.local` (step 3) |
| `AccessDenied` when uploading | The AWS user's S3 permissions |
| 403 when opening the site | That the stack finished correctly and the content was uploaded |
| Broken links | That `SITE_URL` matches the real address |
