---
id: intro
title: Bienvenida
slug: /
sidebar_position: 1
---

# CargaExpress Docs

Documentación técnica de **CargaExpress Control Tower**, la torre de control logística que recibe pedidos y envíos y
traduce los estados de cada transportadora a un vocabulario único.

## Qué encontrarás aquí

| Sección | Contenido |
|---|---|
| [Simulador de webhooks (HU-17)](./simulador/vision-general.md) | Servicio que simula 5 transportadoras Tipo A enviando eventos, con duplicados y eventos fuera de orden |
| [Despliegue de este sitio](./despliegue/github-pages.md) | Cómo se publica esta documentación en GitHub Pages (con una alternativa en AWS S3) |
| [Convención de commits](./contribuir/convencion-de-commits.md) | Cómo escribimos los commits del proyecto |

## Contexto del proyecto

El backend (FastAPI, SQLAlchemy asíncrono, Alembic y PostgreSQL) maneja pedidos y un **mapeo de estados**: cada
transportadora llama distinto a sus estados y el sistema los traduce a 8 estados canónicos.

| Estado canónico | Significado |
|---|---|
| `CREATED` | Envío registrado |
| `PICKED_UP` | Recolectado |
| `IN_TRANSIT` | En tránsito |
| `OUT_FOR_DELIVERY` | En reparto |
| `EXCEPTION` | Novedad (intento fallido, retención, cancelación) |
| `DELIVERED` | Entregado |
| `RETURNED` | Devuelto al remitente |
| `LOST_OR_DAMAGED` | Perdido o dañado |

:::note
Esta documentación cubre por ahora el simulador de webhooks. Otras secciones se irán añadiendo.
:::
