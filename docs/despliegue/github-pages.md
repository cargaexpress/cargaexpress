---
id: github-pages
title: Desplegar en GitHub Pages
sidebar_position: 1
---

# Desplegar este sitio en GitHub Pages

El sitio se publica solo con **GitHub Actions** cada vez que se sube un cambio a la rama `main`. No hay que construir ni subir
nada a mano.

## Dirección del sitio

```text
https://cargaexpress.github.io/simulator-docosaurus/
```

## Activarlo (una sola vez)

1. En GitHub abre el repositorio → **Settings** → **Pages**.
2. En **Build and deployment → Source** elige **GitHub Actions**.
3. Ve a la pestaña **Actions**. El flujo *Deploy docs to GitHub Pages* corre con cada push a `main`. Para lanzarlo a mano, entra
   al flujo y pulsa **Run workflow**.
4. Cuando termine, la dirección aparece en **Settings → Pages** y en el resumen del flujo.

:::warning Repositorio privado
GitHub Pages en un repositorio **privado** solo está disponible en planes de pago (por ejemplo Pro o Team). Con el plan gratuito,
la opción de Pages no aparece o exige que el repositorio sea público. Además, **el sitio publicado es público** aunque el
repositorio sea privado, salvo en planes Enterprise con Pages privadas. No publiques información confidencial.
:::

## Cómo funciona

El flujo (`.github/workflows/deploy-pages.yml`) instala las dependencias, construye el sitio con las variables
`SITE_URL=https://cargaexpress.github.io` y `BASE_URL=/simulator-docosaurus/`, y publica la carpeta `build`.

## Probar la versión de Pages en tu computador

```bash
SITE_URL=https://cargaexpress.github.io BASE_URL=/simulator-docosaurus/ npm run build
npm run serve        # abre http://localhost:3000/simulator-docosaurus/
```

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| No aparece **Pages** en Settings | El plan no permite Pages en repositorios privados |
| El flujo falla en `deploy` | Que **Source** sea **GitHub Actions** (paso 2) |
| El sitio abre sin estilos o con enlaces rotos | Que `BASE_URL` sea `/nombre-del-repositorio/` |
| 404 al abrir la dirección | Esperar un par de minutos tras el primer despliegue |

Si el repositorio cambia de nombre, la dirección y el `BASE_URL` cambian solos, porque el flujo usa el nombre del repositorio.
