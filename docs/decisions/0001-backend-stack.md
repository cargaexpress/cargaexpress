---
id: 0001-backend-stack
title: "ADR-0001: Backend stack"
sidebar_position: 2
---

# ADR-0001: FastAPI, async SQLAlchemy and PostgreSQL

**Status:** Accepted

## Context

The tower needs an HTTP API that handles many concurrent, mostly I/O-bound requests (orders now, carrier webhooks later) on
top of a relational model with strict integrity rules.

## Decision

- **FastAPI** for the API, with Pydantic schemas as request and response contracts.
- **SQLAlchemy 2 in async mode** with the `asyncpg` driver.
- **PostgreSQL 16** as the only database.
- **Alembic** for every schema change.
- **Pydantic Settings** so configuration comes only from environment variables.
- Layering of routers, services and schemas, so persistence rules are reusable and testable without HTTP.

## Consequences

- Constraints (foreign keys, unique and `CHECK`) live in the database, not only in application code.
- Every schema change needs a reviewed Alembic migration.
- The application has no default database URL: without `DATABASE_URL` it does not start.

## Evidence

`backend/pyproject.toml`, `backend/app/database.py`, `backend/app/config.py`, `backend/app/services/`.
