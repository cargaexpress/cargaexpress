---
id: user-stories
title: User stories
sidebar_position: 2
---

# User stories

Every user story of the project, grouped by epic, with its owner, its Jira status and where the work currently lives. The
data comes from a Jira export of project RIWI (72 issues).

:::note How to read the Jira types
In Jira, **epics** (purple) group a theme, **user stories** (green) and **HU tasks** (blue) carry the user stories, and
**subtasks** (blue) are the concrete work. The first nine stories (`US-01` to `US-09`) are typed *Story*. From sprint 2 on, the
main user stories are the `HU-11` onward, typed *Task* in Jira. Setup task `RIWI-1` (AWS and Jira creation) is not a user story
and is not listed.
:::

:::warning This export only contains finished work
All 72 issues are in status *Finalizado*. Stories that are not finished (for example `HU-18` and `HU-20` onward) were left out
by a filter, so this page will be completed when an unfiltered export is available.
:::


## Business Understanding and Rules Alignment (RIWI-9)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| US-01 · RIWI-11 | Translate Business Rules into Technical Specifications | Helda Reyes | Finalizado | Specification deliverable (RN-01 to RN-10 traceability) |
| US-02 · RIWI-12 | Design the Canonical State Catalog | Julian Vanegas | Finalizado | Implemented in code as HU-12 (`main`) |

<details>
<summary>US-01: 3 subtasks</summary>

- RIWI-16 · Read and translate each business rule (RN-01 to RN-10) into technical specifications (Helda Reyes)
- RIWI-17 · Create traceability matrix (Business Rule -> Component -> Future Test) (Helda Reyes)
- RIWI-18 · Conduct team session to resolve questions and ambiguities (Helda Reyes)

</details>

<details>
<summary>US-02: 3 subtasks</summary>

- RIWI-13 · Define the 8 canonical states and valid transitions (Julian Vanegas)
- RIWI-14 · Design the mapping table (carrier -> proprietary state -> canonical) (Julian Vanegas)
- RIWI-15 · Document the non-overwritable final states rule (Julian Vanegas)

</details>


## Architecture and Data Model (RIWI-21)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| US-03 · RIWI-19 | Define End-to-End Architecture v1 | Alexandra Peña Orozco | Finalizado | Architecture and decision records on this site |
| US-04 · RIWI-25 | Design the Operational Data Model (WMS) | Alexandra Peña Orozco | Finalizado | Models and migration in `main`; full 25-table ERD in `cargaexpress_seed` |

<details>
<summary>US-03: 3 subtasks</summary>

- RIWI-22 · Map the end-to-end flow (source -> ingestion -> processing -> storage -> exposure -> analytics) (Alexandra Peña Orozco)
- RIWI-23 · Define integration for all 3 source modalities (push, pull, file) (Alexandra Peña Orozco)
- RIWI-24 · Draft at least 2 initial ADRs (Alexandra Peña Orozco)

</details>

<details>
<summary>US-04: 3 subtasks</summary>

- RIWI-26 · Model entities: orders, shipping labels, order lines, fulfillment/picking, dispatch, distribution centers (CD) (Alexandra Peña Orozco)
- RIWI-27 · Model order -> multiple shipping labels relationship (RN-07) (Alexandra Peña Orozco)
- RIWI-28 · Validate referential integrity with carrier and brand catalogs (Alexandra Peña Orozco)

</details>


## Backend Foundations (RIWI-35)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| US-05 · RIWI-30 | Build Mock Database Seeding Script | Helda Reyes | Finalizado | `cargaexpress_seed` repository (`main`) |
| US-06 · RIWI-36 | Scaffold the FastAPI Skeleton | Alexandra Peña Orozco | Finalizado | `main` |
| US-07 · RIWI-40 | Dockerize the First Backend Component | Julian Vanegas | Finalizado | `main` (Dockerfile and Compose) |

<details>
<summary>US-05: 4 subtasks</summary>

- RIWI-31 · Write seeding script with a fixed seed value (Helda Reyes)
- RIWI-32 · Write seeding script with a fixed seed value (Helda Reyes)
- RIWI-33 · Implement script idempotency (Helda Reyes)
- RIWI-34 · Inject configurable data quality defects (mixed dates, out-of-order events, etc.) (Helda Reyes)

</details>

<details>
<summary>US-06: 3 subtasks</summary>

- RIWI-37 · Configure FastAPI project with layered architecture (Alexandra Peña Orozco)
- RIWI-38 · Connect ORM (SQLAlchemy) to PostgreSQL (Alexandra Peña Orozco)
- RIWI-39 · Create health check endpoint (Alexandra Peña Orozco)

</details>

<details>
<summary>US-07: 2 subtasks</summary>

- RIWI-41 · Create backend Dockerfile using environment variables (Alexandra Peña Orozco)
- RIWI-42 · Create initial docker-compose.yml (backend + PostgreSQL) (Alexandra Peña Orozco)

</details>


## Project Management and Documentation (RIWI-43)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| US-08 · RIWI-44 | Organize the Git Repository | Alexandra Peña Orozco | Finalizado | README in `main`; no PR template found on `main` |
| US-09 · RIWI-48 | Maintain Architecture Document and Decision Records | Julian Vanegas | Finalizado | This site: [architecture](../architecture/overview.md) and [decision records](../decisions/index.md) |

<details>
<summary>US-08: 3 subtasks</summary>

- RIWI-45 · Create repository with initial README.md (Alexandra Peña Orozco)
- RIWI-46 · Define branching convention (main / develop / feature-*) (Alexandra Peña Orozco)
- RIWI-47 · Configure Pull Request template (Alexandra Peña Orozco)

</details>

<details>
<summary>US-09: 2 subtasks</summary>

- RIWI-49 · Create architecture document template (Julian Vanegas)
- RIWI-50 · Record architecture decisions in ADR format (Julian Vanegas)

</details>


## Data Model and Persistence (RIWI-61)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| HU-11 · RIWI-52 | Implement the Complete WMS ORM Model | Alexandra Peña Orozco | Finalizado | `main` |
| HU-12 · RIWI-57 | Create the Configurable State Mapping Model | Julian Vanegas | Finalizado | `main` |

<details>
<summary>HU-11: 4 subtasks</summary>

- RIWI-53 · Create the Order model (brand_id, dc_id, created_at, dispatched_at, status) (Alexandra Peña Orozco)
- RIWI-54 · Create the Shipping Label model (1 order – N shipping labels relationship, supporting RN-07) (Alexandra Peña Orozco)
- RIWI-55 · Create the Shipping Label model (1 order – N shipping labels relationship, supporting RN-07) Create the Carrier Event model (raw status + canonical status + timestamp) (Alexandra Peña Orozco)
- RIWI-56 · Generate and apply the initial migration using Alembic (Alexandra Peña Orozco)

</details>

<details>
<summary>HU-12: 3 subtasks</summary>

- RIWI-58 · Create the StateMapping model (carrier_id, source_status, canonical_status) (Julian Vanegas)
- RIWI-59 · Populate the initial state mapping seed for the simulated carriers (Julian Vanegas)
- RIWI-60 · Cache the mapping in memory with invalidation when updates are made (Julian Vanegas)

</details>


## Backend: Core Endpoints (RIWI-62)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| HU-13 · RIWI-63 | Order CRUD Endpoints | Alexandra Peña Orozco | Finalizado | `main`. Jira names `PATCH /orders/{id}/dispatch`; the code serves `PATCH /orders/{id}/status` |
| HU-14 · RIWI-68 | Order-Associated Shipping Label Endpoints | Helda Reyes | Finalizado | **Branch only:** `feature/RIWI-68`, not merged into `main` |
| HU-15 · RIWI-72 | Status Mapping Endpoints | Julian Vanegas | Finalizado | `main`, but the router is **not registered** in `app/main.py` |

<details>
<summary>HU-13: 4 subtasks</summary>

- RIWI-64 · Implement POST /api/v1/orders (Alexandra Peña Orozco)
- RIWI-65 · Implement GET /api/v1/orders and GET /api/v1/orders/\{id\} (Alexandra Peña Orozco)
- RIWI-66 · Implement PATCH /api/v1/orders/\{id\}/dispatch (Alexandra Peña Orozco)
- RIWI-67 · Write pytest tests for each endpoint (Alexandra Peña Orozco)

</details>

<details>
<summary>HU-14: 2 subtasks</summary>

- RIWI-69 · Implement POST /api/v1/orders/\{id\}/shipping-labels (Helda Reyes)
- RIWI-70 · Implement GET /api/v1/orders/\{id\}/shipping-labels (Helda Reyes)

</details>

<details>
<summary>HU-15: 3 subtasks</summary>

- RIWI-73 · Implement GET /api/v1/admin/carrier-state-mapping/\{id\} (Julian Vanegas)
- RIWI-74 · Implement PUT /api/v1/admin/carrier-state-mapping/\{id\} (Julian Vanegas)
- RIWI-75 · Write a pytest test verifying that the change is reflected without restarting the service. (Julian Vanegas)

</details>


## Documented APIs (RIWI-76)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| HU-16 · RIWI-77 | Complete OpenAPI/Swagger Documentation | Helda Reyes | Finalizado | **Branch only:** `feautre/RIWI-77` (sic), not merged into `main` |


## Ingestion: Simulators for the Three Modalities (RIWI-81)

| Story | Title | Owner | Jira | Where the work is |
|---|---|---|---|---|
| HU-17 · RIWI-82 | Webhook Simulator (Push) — 5 Type A Carriers | Julian Vanegas | Finalizado | **Branch only:** `feature/RIWI-82-simulador-webhooks`; also published as a [standalone simulator](../simulator/overview.md) |
| HU-19 · RIWI-88 | Type C File Simulator | Helda Reyes | Finalizado | **Branch only:** `feature/RIWI-88`, not merged into `main` |

<details>
<summary>HU-17: 4 subtasks</summary>

- RIWI-83 · Create a simulator service that generates random events for each carrier. (Julian Vanegas)
- RIWI-84 · Implement a catalog of at least 6 custom statuses per carrier. (Julian Vanegas)
- RIWI-85 · Inject duplicate and out-of-order events in a configurable way. (Julian Vanegas)
- RIWI-86 · Dockerize the simulator separately from the backend. (Julian Vanegas)

</details>


## Parents that are not in the export

| Jira key | Title | Note |
|---|---|---|
| RIWI-76 | Documented APIs | Parent of RIWI-77 |
| RIWI-81 | Ingestion: Simulators for the Three Modalities | Parent of RIWI-82, RIWI-88 |
| RIWI-110 | HU-23 — Publish Webhooks to a RabbitMQ Queue | Parent of RIWI-111 |

`RIWI-110` (`HU-23`, publish webhooks to a RabbitMQ queue) is only known through its subtask `RIWI-111`. The RabbitMQ service for Docker Compose lives in the branch `feature/RIWI-111`, not yet in `main`.
