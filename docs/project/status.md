---
id: status
title: Project status
sidebar_position: 1
---

# Project status

What is delivered, what is pending and what is still open in CargaExpress Control Tower.

:::note Source of truth
This page lists the work visible in the repositories. The Jira backlog (project RIWI) remains the source of truth for
planning and priorities.
:::

## Delivered

| Item | What it is | Where to read more |
|---|---|---|
| US-07 | Docker and Docker Compose for the backend and its database | [ADR-0002](../decisions/0002-docker-compose-and-migrations.md), [Running locally](../architecture/local-development.md) |
| RIWI-48 | Architecture documentation and decision records | [Architecture](../architecture/overview.md), [Decision records](../decisions/index.md) |
| HU-12 | Configurable status mapping with admin API and cache | [ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md), [ADR-0004](../decisions/0004-state-mapping-cache.md) |
| HU-13 | Orders API: create, get, list and update status | [API reference](../architecture/api-reference.md) |
| HU-17 | Webhook simulator for 5 Type A carriers | [Webhook simulator](../simulator/overview.md), [ADR-0006](../decisions/0006-independent-webhook-simulator.md) |
| Docs | This documentation site on GitHub Pages | [ADR-0007](../decisions/0007-documentation-site.md) |

## In progress or blocked

| Item | Situation |
|---|---|
| HU-15 | Status mapping per carrier (`GET` and `PUT /api/v1/admin/mapeo-estados/{id}`). The code and tests are committed, but the router is **not registered in `app/main.py`**, so the routes are not served yet |

## Pending

| Item | Detail |
|---|---|
| Webhook ingestion endpoint | The backend cannot receive carrier events yet. The simulator is ready to test it |
| RN-02 | Block moves backwards from terminal statuses and record anomalies. Order status updates are direct today |
| Delta and Epsilon in the backend | The simulator has them, but the backend has no carrier or status mapping for them |
| Simulator Docker test | `docker compose up --build` for the simulator has not been run on a machine with Docker |

## Open questions

| Question | Why it matters |
|---|---|
| Two APIs edit the same table | HU-12 (`/admin/state-mappings`, one row at a time) and HU-15 (`/admin/mapeo-estados`, whole carrier at once) both change `state_mapping`. The team should confirm both are wanted |
| Mixed route naming | Some routes are in Spanish (`pedidos`, `mapeo-estados`) and others in English (`state-mappings`, `health`). A single convention should be decided and recorded as an ADR |
| Confirm "Type A" | The 5 simulated carriers are assumed to be the Type A carriers; the team should confirm the definition |
