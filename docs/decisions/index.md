---
id: index
title: Decision records
sidebar_position: 1
---

# Decision records

Each record explains **one decision taken in the project**: the context, what was decided and what follows from it. They
cover the whole tower, not a single user story.

:::note How these records were written
They were reconstructed from the code, configuration and documentation currently in the repositories, and each one lists its
evidence. The team should review them and correct any record that does not match what was actually agreed.
:::

| Record | Decision | Origin |
|---|---|---|
| [ADR-0001](./0001-backend-stack.md) | FastAPI, async SQLAlchemy and PostgreSQL as the backend stack | Backend foundation |
| [ADR-0002](./0002-docker-compose-and-migrations.md) | Docker Compose, multi-stage image and migrations on start | US-07 |
| [ADR-0003](./0003-canonical-statuses-and-state-mapping.md) | 8 canonical statuses with a database-backed mapping | HU-12 |
| [ADR-0004](./0004-state-mapping-cache.md) | In-memory cache with TTL and invalidation on write | HU-12 |
| [ADR-0005](./0005-admin-api-authentication.md) | Shared admin token, closed by default | HU-12 |
| [ADR-0006](./0006-independent-webhook-simulator.md) | Webhook simulator as an independent service | HU-17 |
| [ADR-0007](./0007-documentation-site.md) | Docusaurus on GitHub Pages, in its own repository, in English | Documentation |
| [ADR-0008](./0008-commit-convention.md) | Conventional, per-file commits in English | Team convention |

## Template

```text
# ADR-NNNN: Title
Status · Context · Decision · Consequences · Evidence
```
