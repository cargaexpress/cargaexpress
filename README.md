# CargaExpress Docs

Sitio de documentación de CargaExpress Control Tower, hecho con [Docusaurus](https://docusaurus.io) 3 y en español.
Contenido actual: simulador de webhooks (HU-17), despliegue del sitio y convención de commits.

## Requisitos

- Node.js 20 o superior

## Uso local

```bash
npm install
npm start            # http://localhost:3000 (se recarga al editar)
npm run build        # genera la carpeta build/
npm run serve        # sirve build/ para revisarlo
```

## Desplegar en AWS S3

Guía completa en `docs/despliegue/desplegar-este-sitio.md`. En resumen:

```bash
aws cloudformation deploy --template-file deploy/aws/site-bucket.yaml \
  --stack-name cargaexpress-docs --parameter-overrides BucketName=cargaexpress-docs-TUNOMBRE --region us-east-2
cp .env.example .env.local        # completar los valores
npm run deploy:s3                 # en Windows, desde Git Bash
```

## Estructura

```
docs/            páginas (Markdown)
  simulador/     documentación del simulador de webhooks (HU-17)
  despliegue/    cómo publicar este sitio
  contribuir/    convención de commits
src/css/         colores del sitio
static/img/      logo y favicon
deploy/aws/      plantilla de CloudFormation del bucket
scripts/         script de despliegue a S3
.githooks/       hook que valida los mensajes de commit
```

## Commits

Los commits van en inglés, con formato `tipo(scope): descripción`, de máximo 50 caracteres, y se hacen archivo por archivo.
Activa el validador una vez por clon:

```bash
git config core.hooksPath .githooks
```

Detalles en `docs/contribuir/convencion-de-commits.md`.
