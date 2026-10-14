---
id: desplegar-este-sitio
title: Alternativa - desplegar en S3
sidebar_position: 2
---

# Alternativa: desplegar este sitio en AWS S3

:::note
El despliegue principal es [GitHub Pages](./github-pages.md). Esta guía queda como alternativa si algún día se prefiere AWS.
:::

El sitio es estático (Docusaurus), así que se publica en un bucket de S3 con alojamiento web. No hay servidores encendidos y el
costo es mínimo.

:::warning El sitio queda público
La documentación será visible para cualquiera con la dirección. No publiques información confidencial. La dirección de S3 usa
**HTTP**; para HTTPS y un dominio propio se puede añadir CloudFront más adelante.
:::

## Requisitos

- Node.js 20 o superior.
- AWS CLI configurado (`aws configure`) con permisos de S3 y CloudFormation.
- Nombre único para el bucket, por ejemplo `cargaexpress-docs-TUNOMBRE`.

## Paso a paso

### 1. Probar el sitio en tu computador

```bash
npm install
npm start          # http://localhost:3000
```

### 2. Crear el bucket (una sola vez)

```bash
aws cloudformation deploy \
  --template-file deploy/aws/site-bucket.yaml \
  --stack-name cargaexpress-docs \
  --parameter-overrides BucketName=cargaexpress-docs-TUNOMBRE \
  --region us-east-2
```

Al terminar, la dirección pública del sitio aparece en la salida `SiteUrl` del stack:

```bash
aws cloudformation describe-stacks --stack-name cargaexpress-docs --region us-east-2 \
  --query "Stacks[0].Outputs[?OutputKey=='SiteUrl'].OutputValue" --output text
```

### 3. Configurar las variables

Copia `.env.example` como `.env.local` y completa los valores (este archivo no se sube al repositorio):

```text
SITE_URL=http://cargaexpress-docs-TUNOMBRE.s3-website.us-east-2.amazonaws.com
BASE_URL=/
S3_BUCKET=cargaexpress-docs-TUNOMBRE
AWS_REGION=us-east-2
```

### 4. Publicar

```bash
npm run deploy:s3
```

El script construye el sitio y lo sincroniza con el bucket. En Windows, ejecútalo desde **Git Bash** o WSL.

### 5. Abrir el sitio

Abre la dirección `SiteUrl` en el navegador.

## Actualizar

Cada vez que cambies la documentación, vuelve a ejecutar `npm run deploy:s3`.

## Apagar todo

```bash
aws s3 rm s3://cargaexpress-docs-TUNOMBRE --recursive
aws cloudformation delete-stack --stack-name cargaexpress-docs --region us-east-2
```

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| `Falta S3_BUCKET` | Crear `.env.local` (paso 3) |
| `AccessDenied` al subir | Permisos del usuario de AWS en S3 |
| 403 al abrir el sitio | Que el stack terminó bien y que se subió el contenido |
| Enlaces rotos | Que `SITE_URL` coincide con la dirección real |
