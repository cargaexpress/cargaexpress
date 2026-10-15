---
id: index
title: Sprint 2 overview
sidebar_position: 1
---

# Sprint 2: turn the design into code

**Sprint:** KAN Sprint 2 · **Observed dates:** 6 to 13 October 2026 · **Stories:** `HU-11` to `HU-19` and the RabbitMQ work of `HU-23`

## Goal

Sprint 1 produced the design (see the [Sprint 1 overview](../sprint-1/index.md)). Sprint 2 builds it: persist the data model,
make the status mapping configurable, expose the API and build simulators that can feed the ingestion layer later.

## Weeks

| Week | Focus | Stories |
|---|---|---|
| [Week 1](./week-1.md) | Persist the model and expose the first endpoints | `HU-11`, `HU-12`, `HU-13` |
| [Week 2](./week-2.md) | Complete the API and build the simulators | `HU-14`, `HU-15`, `HU-16`, `HU-17`, `HU-19`, RabbitMQ |

## Current state

- Merged into `main`: `HU-11`, `HU-12`, `HU-13` and the `HU-15` code (its router is not registered yet).
- In feature branches, not merged: `HU-14`, `HU-16`, `HU-17`, `HU-19` and the RabbitMQ service.
- Not found in the repositories reviewed: the tracking, delay and star-schema layers, and the ingestion pipeline.

The detailed list is in [Project status](../project/status.md); the Jira stories are in [User stories](../project/user-stories.md).

## Related decisions

[ADR-0001](../decisions/0001-backend-stack.md) · [ADR-0002](../decisions/0002-docker-compose-and-migrations.md) ·
[ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md) · [ADR-0004](../decisions/0004-state-mapping-cache.md) ·
[ADR-0005](../decisions/0005-admin-api-authentication.md) · [ADR-0006](../decisions/0006-independent-webhook-simulator.md)
