---
id: intro
title: Welcome
slug: /
sidebar_position: 1
---

# CargaExpress Docs

Technical documentation for **CargaExpress Control Tower**, the logistics control tower that receives orders and shipments and
translates each carrier's statuses into a single vocabulary.

## What you will find here

| Section | Content |
|---|---|
| [Webhook simulator (HU-17)](./simulator/overview.md) | Service that simulates 5 Type A carriers sending events, with duplicates and out-of-order events |
| [Deploying this site](./deployment/github-pages.md) | How this documentation is published to GitHub Pages (with an AWS S3 alternative) |
| [Commit convention](./contributing/commit-convention.md) | How we write the project's commits |

## Project context

The backend (FastAPI, async SQLAlchemy, Alembic and PostgreSQL) handles orders and a **status mapping**: each carrier names
its statuses differently and the system translates them into 8 canonical statuses.

| Canonical status | Meaning |
|---|---|
| `CREATED` | Shipment registered |
| `PICKED_UP` | Picked up |
| `IN_TRANSIT` | In transit |
| `OUT_FOR_DELIVERY` | Out for delivery |
| `EXCEPTION` | Exception (failed attempt, hold, cancellation) |
| `DELIVERED` | Delivered |
| `RETURNED` | Returned to sender |
| `LOST_OR_DAMAGED` | Lost or damaged |

:::note
For now this documentation covers the webhook simulator. More sections will be added.
:::
