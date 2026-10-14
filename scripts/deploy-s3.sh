#!/usr/bin/env bash
# Construye el sitio y lo sube a S3.
# Uso: npm run deploy:s3   (necesita AWS CLI configurado y un archivo .env.local; ver .env.example)
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -f .env.local ]; then
  set -a
  # shellcheck disable=SC1091
  . ./.env.local
  set +a
fi

: "${S3_BUCKET:?Falta S3_BUCKET (nombre del bucket). Revisa .env.example}"
: "${SITE_URL:?Falta SITE_URL (dirección pública del sitio). Revisa .env.example}"
AWS_REGION="${AWS_REGION:-us-east-2}"

echo "==> Construyendo el sitio para ${SITE_URL}"
npm run build

echo "==> Subiendo a s3://${S3_BUCKET} (${AWS_REGION})"
# Archivos con huella en el nombre (assets): caché larga.
aws s3 sync build/ "s3://${S3_BUCKET}" --region "${AWS_REGION}" --delete \
  --exclude "*.html" --exclude "sitemap.xml" \
  --cache-control "public, max-age=31536000, immutable"
# Páginas: caché corta para ver los cambios pronto.
aws s3 sync build/ "s3://${S3_BUCKET}" --region "${AWS_REGION}" --delete \
  --exclude "*" --include "*.html" --include "sitemap.xml" \
  --cache-control "public, max-age=60"

echo "==> Listo: ${SITE_URL}"
