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

## Desplegar en GitHub Pages

Se publica solo con GitHub Actions al subir cambios a `main` (`.github/workflows/deploy-pages.yml`). Una sola vez, en GitHub:
**Settings → Pages → Source → GitHub Actions**. Dirección: `https://cargaexpress.github.io/simulator-docosaurus/`.

GitHub Pages en repositorios privados requiere un plan de pago, y el sitio publicado es público. Detalles en
`docs/despliegue/github-pages.md`. Como alternativa, `docs/despliegue/desplegar-este-sitio.md` explica cómo publicar en AWS S3.

## Estructura

```
docs/            páginas (Markdown)
  simulador/     documentación del simulador de webhooks (HU-17)
  despliegue/    cómo publicar este sitio (GitHub Pages y alternativa S3)
  contribuir/    convención de commits
src/css/         colores del sitio
static/img/      logo y favicon
deploy/aws/      plantilla de CloudFormation del bucket (alternativa S3)
scripts/         script de despliegue a S3 (alternativa)
.github/         flujo que publica en GitHub Pages
.githooks/       hook que valida los mensajes de commit
```

## Commits

Los commits van en inglés, con formato `tipo(scope): descripción`, de máximo 50 caracteres, y se hacen archivo por archivo.
Activa el validador una vez por clon:

```bash
git config core.hooksPath .githooks
```

Detalles en `docs/contribuir/convencion-de-commits.md`.
