---
id: running-with-docker
title: Running and Docker
sidebar_position: 6
---

# Running and Docker

## With Docker (recommended)

```bash
docker compose up --build              # simulator + test receiver on port 9000
curl localhost:9000/stats              # received messages and repeated identical messages
curl "localhost:9000/received?carrier=delta&limit=3"
docker compose run --rm tests          # automated tests ("test" profile)
docker compose down
```

The compose file defines three services, independent from the backend's compose file:

| Service | What it does |
|---|---|
| `sink` | Test receiver, with a health check (`/health`) |
| `simulator` | Sends events to `sink` once it is healthy |
| `tests` | Runs the tests (only with the `test` profile) |

To change the behavior: `SIM_DUPLICATE_RATE=0.5 docker compose up`, or a `.env` file next to the compose file.
To send to a backend on your machine: `SIM_TARGET_URL_TEMPLATE=http://host.docker.internal:8000/webhooks/{carrier}`.

### What the Dockerfile contains

It is multi-stage: dependencies, tests and runtime. It uses `uv` pinned to the same version as the backend, installs with
`uv sync --frozen`, and the final image runs as an unprivileged user.

:::warning Verification status
The Docker files are written and reviewed, and the simulator was run in an environment equivalent to the final image.
However, the environment where it was developed **had no Docker**, so `docker compose up --build` must be tested on a machine
with Docker before the subtask is considered closed.
:::

## Without Docker

```bash
uv sync --python 3.12
uv run python -m webhook_simulator.sink --port 9000 &            # test receiver
uv run python -m webhook_simulator --max-events 200 --seed 1     # simulator
uv run pytest -q
```

## Test receiver

It only uses the standard library and keeps what arrives in memory, without interpreting it.

| Route | What it does |
|---|---|
| `POST /webhooks/<carrier>` | Receives an event |
| `GET /stats` | Totals, per carrier, and repeated identical messages |
| `GET /received?carrier=&limit=` | Latest received messages |
| `GET /health` | Service status |
