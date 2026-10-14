---
id: week-1
title: Sprint 2 · week 1
sidebar_position: 2
---

# Sprint 2 · week 1: persist the model and expose the first endpoints

**Sprint:** KAN Sprint 2 · Week 1 · **Observed dates:** 6 to 8 October 2026 · **Stories:** `HU-11`, `HU-12`, `HU-13`

The design of sprint 1 starts to become code: the data model is persisted, the status mapping becomes configurable, and the
first business endpoints appear.

| Story | Jira | Title | Owner | In `main` |
|---|---|---|---|---|
| `HU-11` | RIWI-52 | Implement the complete WMS ORM model | Alexandra Peña Orozco | Yes |
| `HU-12` | RIWI-57 | Create the configurable state mapping model | Julian Vanegas | Yes |
| `HU-13` | RIWI-63 | Order CRUD endpoints | Alexandra Peña Orozco | Yes |

Epics: *Data Model and Persistence* (`HU-11`, `HU-12`) and *Backend: Core Endpoints* (`HU-13`).

## HU-11 · WMS ORM model

**Goal.** Persist the real life cycle of an order with SQLAlchemy models, and generate and apply the initial Alembic migration
without errors.

| Subtask | Work |
|---|---|
| RIWI-53 | `Order` model |
| RIWI-54, RIWI-55 | `ShippingLabel` model: one order, many shipping labels (RN-07) |
| RIWI-56 | Generate and apply the initial migration with Alembic |

**Result.** 11 tables for orders, shipping labels, distribution centers, picking and dispatch, one file per model in
`backend/app/models/`, created by migration `dee4876a63bd`. See [Implemented data model](../architecture/data-model.md) and the
[design](../sprint-1/data-model.md#1-operational-wms) it follows.

## HU-12 · Configurable state mapping

**Goal.** Translate each carrier's own status into one of the 8 canonical states, with a mapping that can be changed without
restarting the service (acceptance criterion CA-06).

| Subtask | Work |
|---|---|
| RIWI-58 | `StateMapping` model: carrier, source status, canonical status |
| RIWI-59 | Initial seed of the mapping for the simulated carriers |
| RIWI-60 | Cache the mapping in memory and invalidate it when it changes |

**Result.**

- The `state_mapping` table with a unique `(carrier_id, raw_status)` pair and a `CHECK` that limits the canonical status to the
  8 allowed values.
- An admin API under `/api/v1/admin/state-mappings`, protected by the `X-Admin-Token` header.
- An in-memory cache with a 300-second lifetime, invalidated after every committed change.
- A status that has no mapping is **not** converted: the resolve endpoint answers `404`.
- Migrations `a3f1c9d27b45`, `b7e24d51c8a9` and `c4a1209b7e6f`. Each simulated carrier has at least six distinct source statuses.

The decisions are in [ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md),
[ADR-0004](../decisions/0004-state-mapping-cache.md) and [ADR-0005](../decisions/0005-admin-api-authentication.md). How this differs
from the sprint 1 design is in [Design versus implementation](./design-vs-implementation.md).

## HU-13 · Order endpoints

**Goal.** Expose the basic order life cycle through the API, working against a real database.

| Subtask | Work |
|---|---|
| RIWI-64 | `POST /api/v1/pedidos` |
| RIWI-65 | `GET /api/v1/pedidos` and `GET /api/v1/pedidos/{id}` |
| RIWI-66 | `PATCH /api/v1/pedidos/{id}/despacho` (as named in Jira) |
| RIWI-67 | `pytest` tests for each endpoint |

**Result.** Creating an order stores its lines and its recipient, and checks that the brand, the distribution center and the
shipment type exist (otherwise `404`). The list is paginated. The update endpoint changes the status of the order.

:::warning Name differs from Jira
Jira names the update `PATCH /pedidos/{id}/despacho`, but the code serves `PATCH /pedidos/{id}/status`. The update is direct:
rule RN-02, which stops an order from moving backwards from a final status, is not implemented yet.
:::

## Verification

The integration tests run against a real PostgreSQL, started by Docker Compose with the `test` profile. On `main` there are 38
test functions across health, orders, the admin status mapping, the mapping cache, the mapping seed and the per-carrier mapping.
See [Running the project locally](../architecture/local-development.md#run-the-tests).

## Related

[Sprint 2 overview](./index.md) · [Sprint 2 · week 2](./week-2.md) · [API reference](../architecture/api-reference.md)
