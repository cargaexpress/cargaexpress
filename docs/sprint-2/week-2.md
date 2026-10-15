---
id: week-2
title: Sprint 2 · week 2
sidebar_position: 3
---

# Sprint 2 · week 2: complete the API and build the simulators

**Sprint:** KAN Sprint 2 · Week 2 · **Observed dates:** 6 to 13 October 2026 · **Stories:** `HU-14`, `HU-15`, `HU-16`, `HU-17`,
`HU-19` and the RabbitMQ work of `HU-23`

This week completes the API with shipping labels, status-mapping endpoints and OpenAPI documentation, and builds the simulators
that will test ingestion.

| Story | Jira | Title | Owner | Where the work is |
|---|---|---|---|---|
| `HU-14` | RIWI-68 | Order-associated shipping label endpoints | Helda Reyes | Branch `feature/RIWI-68` |
| `HU-15` | RIWI-72 | Status mapping endpoints | Julian Vanegas | `main`, router not registered |
| `HU-16` | RIWI-77 | Complete OpenAPI and Swagger documentation | Helda Reyes | Branch `feautre/RIWI-77` |
| `HU-17` | RIWI-82 | Webhook simulator (push), 5 type A carriers | Julian Vanegas | Branch `feature/RIWI-82-simulador-webhooks` and a [standalone project](../simulator/overview.md) |
| `HU-19` | RIWI-88 | Type C file simulator | Helda Reyes | Branch `feature/RIWI-88` |
| `HU-23` | RIWI-110 | Publish webhooks to a RabbitMQ queue | n/a | RabbitMQ service in `feature/RIWI-111` |

Epics: *Backend: Core Endpoints* (`HU-14`, `HU-15`), *Documented APIs* (`HU-16`) and *Ingestion: Simulators for the Three
Modalities* (`HU-17`, `HU-19`).

## HU-14 · Shipping label endpoints

**Goal.** Support split orders (RN-07) with endpoints for the shipping labels of an order, validating that each label belongs to
the order.

| Subtask | Work |
|---|---|
| RIWI-69 | `POST /api/v1/pedidos/{id}/guias` registers a new guide for an order |
| RIWI-70 | `GET /api/v1/pedidos/{id}/guias` lists the guides of an order |

**Result in the branch.** A guide schema, a guide service, new error types in the services layer, the two routes added to the
orders router, and a test file for the guide endpoints. The branch is not yet merged into `main`.

## HU-15 · Status mapping endpoints

**Goal.** Let an administrator query and replace the whole status mapping of one carrier (acceptance criterion CA-06).

| Subtask | Work |
|---|---|
| RIWI-73 | `GET /api/v1/admin/mapeo-estados/{id}` |
| RIWI-74 | `PUT /api/v1/admin/mapeo-estados/{id}`: replaces the full mapping and applies it without restarting |
| RIWI-75 | A `pytest` test that checks the change is reflected without a restart |

**Result.** The router, schemas, service and tests are on `main`. A concurrent write that wins the race answers `409` with a
message to retry.

:::warning Not reachable yet
The router `admin_mapeo_estados` is **not registered** in `backend/app/main.py`, so these two routes are not served. Adding the
import and an `include_router` call fixes it. See [Project status](../project/status.md).
:::

## HU-16 · OpenAPI and Swagger documentation

**Goal.** Complete the interactive documentation at `/docs`, with examples, and export the contract to `docs/api/openapi.json`
(deliverable E-05).

**Result in the branch.** Request and response schemas with examples, a shared error schema, a script `scripts/export_openapi.py`
that writes the OpenAPI contract, the exported file `docs/api/openapi.json`, and a test that checks the contract. The branch is
not yet merged into `main`.

## HU-17 · Webhook simulator

**Goal.** Send events from 5 type A carriers in different formats, with varied statuses, duplicates and out-of-order events.

| Subtask | Work |
|---|---|
| RIWI-83 | A service that generates random events for each carrier |
| RIWI-84 | A catalog of at least 6 own statuses per carrier |
| RIWI-85 | Duplicate and out-of-order events, injected in a configurable way |
| RIWI-86 | Dockerize the simulator separately from the backend |

**Result.** Five carriers in five formats (flat JSON, nested JSON, Spanish-language JSON, XML and form data), 10 or 11 statuses
each, configurable and reproducible duplicates and disorder, a local test receiver, optional publication to S3, and a Docker
setup. Read the [Webhook simulator](../simulator/overview.md) pages and the
[HU-17 compliance](../simulator/hu-17-compliance.md) page.

## HU-19 · Type C file simulator

**Goal.** Test batch ingestion every 4 hours with CSV or Excel files that contain the expected data quality defects.

**Result in the branch.** A `simulators/type_c` package with carrier catalogs, a generator, a module that injects errors, and a
command-line tool. The command accepts a fixed seed for exact reproducibility, the carrier (1 to 3), an output folder, the number
of rows and an error rate between 0 and 1. The generator also computes a SHA-256 of each file. The branch also adds a WMS seeder
and tests for both. It is not yet merged into `main`.

## RabbitMQ in Docker Compose (RIWI-111)

**Goal.** Provide the message broker for push ingestion (see [ADR-0008](../decisions/0008-three-ingestion-modalities.md)).

**Result in the branch.** A `rabbitmq` service with the management interface, persistent storage for queues and messages, a health
check, and credentials read from `.env` (`RABBITMQ_USER` and `RABBITMQ_PASSWORD`). The AMQP port is `5672` and the web interface
is `15672`. Not yet merged into `main`.

## Related

[Sprint 2 overview](./index.md) · [Sprint 2 · week 1](./week-1.md)
