---
id: overview
title: Architecture overview
sidebar_position: 1
---

# Architecture overview

CargaExpress Control Tower is a logistics control tower. It receives orders, follows their shipments across several
carriers, and translates every carrier's own statuses into one shared vocabulary.

## Components

| Component | Technology | Where it lives | Role |
|---|---|---|---|
| Backend API | FastAPI, async SQLAlchemy 2, Pydantic Settings | `cargaexpress_control_tower/backend` | Orders API, status mapping, admin API, health check |
| Database | PostgreSQL 16 | Docker service `db` | Orders, WMS tables and the `state_mapping` table |
| Migrations | Alembic | `backend/alembic/versions` | Schema and seed data; applied on every backend start |
| Containers | Docker Compose, multi-stage Dockerfile with `uv` | repository root and `backend/Dockerfile` | One command runs the API and the database |
| Webhook simulator | Python, standard library, optional `boto3` | its own repository | Simulates 5 Type A carriers sending events (see [Webhook simulator](../simulator/overview.md)) |
| Documentation site | Docusaurus 3 on GitHub Pages | `cargaexpress/cargaexpress` | This site |

## How the pieces fit together

```text
 Carriers (real or simulated)                    Operators
        │  webhooks (push)                          │  X-Admin-Token
        ▼                                           ▼
 ┌──────────────────────────  Backend API (FastAPI)  ─────────────────────────┐
 │  /api/v1/health   /api/v1/pedidos   /api/v1/admin/state-mappings  ...      │
 │        │                │                        │                          │
 │        │          order_service        mapeo_estados_service + TTL cache    │
 └────────┼────────────────┼────────────────────────┼──────────────────────────┘
          ▼                ▼                        ▼
                      PostgreSQL 16  (orders, WMS tables, state_mapping)
```

:::note Ingestion is not built yet
The arrow from the carriers into the backend is the target design. The backend does **not** have a webhook ingestion
endpoint yet. The [webhook simulator](../simulator/overview.md) exists so that endpoint can be tested as soon as it is built.
:::

## Code layout of the backend

| Folder | Responsibility |
|---|---|
| `app/routers` | HTTP layer: request and error translation only |
| `app/services` | Business and persistence rules, reusable and testable without HTTP |
| `app/schemas` | Pydantic request and response contracts |
| `app/models` | SQLAlchemy models, one file per table |
| `app/security.py` | Admin token check |
| `app/config.py` | Settings read from environment variables |
| `tests` | Integration tests that run against a real PostgreSQL |

## Canonical statuses

Every carrier names its statuses differently. The system stores a mapping and translates them into 8 canonical statuses.

| Canonical status | Meaning |
|---|---|
| `CREATED` | Shipment registered |
| `PICKED_UP` | Picked up |
| `IN_TRANSIT` | In transit |
| `OUT_FOR_DELIVERY` | Out for delivery |
| `EXCEPTION` | Exception (failed attempt, hold, cancellation) |
| `DELIVERED` | Delivered (terminal) |
| `RETURNED` | Returned to sender (terminal) |
| `LOST_OR_DAMAGED` | Lost or damaged (terminal) |

The reasoning behind these choices is recorded in the [decision records](../decisions/index.md).
