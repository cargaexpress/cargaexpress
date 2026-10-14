---
id: hu-17-compliance
title: HU-17 compliance
sidebar_position: 8
---

# HU-17 compliance

**Task:** RIWI-82 (parent RIWI-81) · **Subtasks:** RIWI-83, RIWI-84, RIWI-85, RIWI-86

## Acceptance criterion

> The simulator sends events with different formats, varied statuses, and duplicated or out-of-order events.

| Part of the criterion | How it is met |
|---|---|
| Different formats | 5 carriers, 5 formats: flat JSON, nested JSON, Spanish-language JSON, XML and form data |
| Varied statuses | 10 or 11 statuses per carrier and lifecycles with exception, return, loss and cancellation |
| Duplicates | Byte-for-byte identical resend, with configurable probability and delay |
| Out of order | An event is swapped with a later event of the same shipment |

## Subtasks

| Subtask | Requirement | Status |
|---|---|---|
| RIWI-83 | Service that generates random events per carrier | Done and tested |
| RIWI-84 | Catalog of at least 6 own statuses per carrier | Done (10 or 11 per carrier) |
| RIWI-85 | Configurable duplicates and out-of-order events | Done and tested |
| RIWI-86 | Dockerize the simulator separately from the backend | Done; **`docker compose up --build` still has to be tested on a machine with Docker** |

## Verification performed

- **76 automated tests** pass. Another 3 (comparing the statuses with the backend migration) only run if the simulator is
  placed inside the backend repository.
- **Mutation testing:** the code was deliberately broken in 7 places and the tests failed in all 7.
- **Real run** in a clean environment with production dependencies only: 300 messages against a real receiver, no failures;
  clean stop with `SIGTERM`; an unreachable target counted as failures with exit code 1.
- **S3 publishing** verified with a simulated S3 and with a real bucket: the summary answered with 1000 messages (916 unique,
  84 duplicates and 142 out of order).

## Known limitations

- The backend does not have a webhook ingestion endpoint yet.
- Delta and Epsilon have no carrier or status mapping in the backend database.
- Docker was not run in the development environment.
