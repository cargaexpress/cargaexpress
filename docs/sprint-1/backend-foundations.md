---
id: backend-foundations
title: Backend foundations (US-06 to US-09)
sidebar_position: 9
---

# Backend foundations and project organization

Four stories set up the technical and organizational base on which sprint 2 builds.

## US-06 · FastAPI skeleton

**RIWI-36** · Owner: Alexandra Peña Orozco · Epic: Backend Foundations · Subtasks: RIWI-37, RIWI-38, RIWI-39

A FastAPI application connected to PostgreSQL through SQLAlchemy, with a layered structure ready for the endpoints of sprint 2.

| Acceptance criterion | Result |
|---|---|
| The health check answers `200 OK` with a successful status | `GET /api/v1/health` returns `{"status":"ok","database":"up"}` |
| The ORM connects to PostgreSQL with the configured settings | Async SQLAlchemy with the `asyncpg` driver, configured from `DATABASE_URL` |
| Clearly separated and modular layers | `routers`, `services`, `schemas` and `models` folders |

See [Implemented backend](../architecture/overview.md) and [ADR-0001](../decisions/0001-backend-stack.md).

## US-07 · Dockerize the first backend component

**RIWI-40** · Owner: Julian Vanegas · Epic: Backend Foundations · Subtasks: RIWI-41 (Dockerfile using environment variables),
RIWI-42 (initial `docker-compose.yml` with backend and PostgreSQL)

| Acceptance criterion | Result |
|---|---|
| `docker compose up` starts the backend and PostgreSQL, and they communicate | One command starts both services; the backend waits for a healthy database and applies migrations first |
| Configuration and credentials come from environment variables | Nothing sensitive is written in the Dockerfile or the code; `.env` is ignored by Git |
| Portable across machines | The same setup runs on any machine with Docker |

See [Running the project locally](../architecture/local-development.md) and [ADR-0002](../decisions/0002-docker-compose-and-migrations.md).

## US-08 · Organize the Git repository

**RIWI-44** · Owner: Alexandra Peña Orozco · Epic: Project Management and Documentation · Subtasks: RIWI-45 (repository with
README), RIWI-46 (branching convention), RIWI-47 (pull request template)

| Acceptance criterion | Result |
|---|---|
| The repository has a README with the purpose, setup and structure | The `README.md` exists in `cargaexpress_control_tower` |
| Conventions for `main`, `develop` and `feature-*` branches are documented | Defined in the story; work is done on `feature/RIWI-xx` branches |
| A pull request template guides contributors | No template was found on `main` of the backend repository |

See [Team and way of working](../project/team-and-process.md).

## US-09 · Architecture document and decision records

**RIWI-48** · Owner: Julian Vanegas · Epic: Project Management and Documentation · Subtasks: RIWI-49 (architecture document
template), RIWI-50 (record decisions in ADR format)

| Acceptance criterion | Result |
|---|---|
| The v1 architecture document is in the repository and follows the baseline template | [Architecture v1](./architecture-v1.md) and the [implemented backend](../architecture/overview.md) |
| At least 2 initial ADRs are stored using the standard template | [Decision records](../decisions/index.md): 12 records, each with context, decision, consequences and evidence |

## Related

[Sprint 1 overview](./index.md) · [Decision records](../decisions/index.md)
