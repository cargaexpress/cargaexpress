---
id: intro
title: Welcome
slug: /
sidebar_position: 1
---

# CargaExpress Docs

Technical documentation for **CargaExpress Control Tower**, the logistics control tower that receives orders and shipments and
translates each carrier's statuses into a single vocabulary. It covers the whole tower and the decisions taken in the
project, not a single user story.

## What you will find here

| Section | Content |
|---|---|
| [Architecture](./architecture/overview.md) | Components, data model, API reference and how to run the project |
| [Decision records](./decisions/index.md) | The decisions taken in the project, with context and consequences |
| [Project status](./project/status.md) | What is delivered, pending and still open |
| [Webhook simulator (HU-17)](./simulator/overview.md) | Service that simulates 5 Type A carriers sending events |
| [This documentation site](./deployment/github-pages.md) | How the site is published to GitHub Pages |
| [Contributing](./contributing/commit-convention.md) | How we write the project's commits |

## The tower in one minute

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

## Where to start

- New to the project: read the [architecture overview](./architecture/overview.md), then run it with the
  [local development guide](./architecture/local-development.md).
- Wondering why something is built the way it is: check the [decision records](./decisions/index.md).
- Looking for pending work: see [project status](./project/status.md).
