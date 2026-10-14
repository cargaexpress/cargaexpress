---
id: local-development
title: Running the project locally
sidebar_position: 4
---

# Running the project locally

## Requirements

- Docker Desktop running, with Docker Compose v2 (`docker compose`).
- Ports `8000` and `5432` free, or alternative ports set in `.env`.

Python, `uv` and PostgreSQL do not need to be installed to use Docker.

## Steps

```bash
cp .env.example .env        # then edit the credentials
docker compose up
```

`docker compose up` rebuilds the backend image, starts PostgreSQL, waits until it is healthy, runs `alembic upgrade head`
and then starts FastAPI.

| Service | Port | Notes |
|---|---|---|
| `backend` | `8000` | API and `/docs` |
| `db` | `5432` | PostgreSQL 16, data kept in the `postgres_data` volume |

## Environment variables

| Variable | Default | Purpose |
|---|---|---|
| `POSTGRES_USER`, `POSTGRES_PASSWORD` | none, required | Database credentials |
| `POSTGRES_DB` | `cargaexpress` | Database name |
| `BACKEND_PORT`, `DB_PORT` | `8000`, `5432` | Published ports |
| `APP_ENV` | `development` | Environment name |
| `SQL_ECHO` | `false` | Log SQL statements |
| `ADMIN_API_KEY` | empty | Enables the admin endpoints. Empty means they answer `503` |
| `STATE_MAPPING_CACHE_TTL_SECONDS` | `300` | Lifetime of the status mapping cache |

`DATABASE_URL` is built by Compose using the host `db`. The application has no default database URL, so without it the
backend does not start. Never commit real credentials: `.env` is ignored by Git.

## Verify

```bash
docker compose exec backend alembic current          # expected: c4a1209b7e6f (head)
curl http://localhost:8000/api/v1/health             # expected: {"status":"ok","database":"up"}
```

## Run the tests

```bash
docker compose --profile test up --build --abort-on-container-exit --exit-code-from test test
```

This starts an isolated PostgreSQL for tests, resets its migrations and runs `pytest`. It never touches the normal database.
Test dependencies are not part of the production image.

:::warning Keep your data
`docker compose down` keeps the data. Do **not** use `docker compose down -v` unless you want to delete the database too.
:::
