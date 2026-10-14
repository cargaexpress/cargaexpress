---
id: 0002-docker-compose-and-migrations
title: "ADR-0002: Docker Compose and migrations"
sidebar_position: 3
---

# ADR-0002: Docker Compose, multi-stage image and migrations on start

**Status:** Accepted · **Origin:** US-07

## Context

Anyone on the team must be able to run the backend and its database without installing Python, `uv` or PostgreSQL, and the
tests must never damage normal data.

## Decision

- **One command** (`docker compose up`) starts `backend` and `db`. The backend waits until PostgreSQL is healthy.
- A **multi-stage Dockerfile** separates dependencies, tests and runtime. It uses `uv` pinned to a version that reads the
  project's `uv.lock`, installs with `uv sync --frozen`, and runs the final image as an **unprivileged user**.
- The container runs **`alembic upgrade head` before starting Uvicorn**, so the schema is always current.
- **All configuration arrives as environment variables.** Credentials are read from `.env`, which Git ignores.
- A **`test` profile** starts a separate PostgreSQL (`test-db`), resets its migrations and runs `pytest`.
- Source code is **not mounted** as a volume: `docker compose up` rebuilds the image so code and schema changes show up.
- Data lives in the `postgres_data` named volume.

## Consequences

- Reproducible setup and a production image without test dependencies.
- Rebuilding on every `up` is slower than a mounted volume but avoids "works on my machine" differences.
- `docker compose down -v` deletes the database and must be used deliberately.

## Evidence

`docker-compose.yml`, `backend/Dockerfile`, `.env.example`.
