#!/usr/bin/env bash
# Builds the site and uploads it to S3.
# Usage: npm run deploy:s3   (needs a configured AWS CLI and a .env.local file; see .env.example)
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -f .env.local ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env.local
  set +a
fi

: "${S3_BUCKET:?S3_BUCKET is required (bucket name). See .env.example}"
: "${SITE_URL:?SITE_URL is required (public site address). See .env.example}"
AWS_REGION="${AWS_REGION:-us-east-2}"

echo "==> Building the site for ${SITE_URL}"
npm run build

echo "==> Uploading to s3://${S3_BUCKET} (${AWS_REGION})"
# Files with a hash in the name (assets): long cache.
aws s3 sync build/ "s3://${S3_BUCKET}" --region "${AWS_REGION}" --delete \
  --exclude "*.html" --exclude "sitemap.xml" \
  --cache-control "public, max-age=31536000, immutable"
# Pages: short cache so changes show up soon.
aws s3 sync build/ "s3://${S3_BUCKET}" --region "${AWS_REGION}" --delete \
  --exclude "*" --include "*.html" --include "sitemap.xml" \
  --cache-control "public, max-age=60"

echo "==> Done: ${SITE_URL}"
