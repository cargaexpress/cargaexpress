---
id: 0010-three-ingestion-modalities
title: "ADR-0010: Three ingestion modalities"
sidebar_position: 11
---

# ADR-0010: Push, pull and file ingestion converge on one raw store

**Status:** Proposed in the architecture design · **Origin:** US-03 (RIWI-23)

## Context

The 12 carriers deliver information in three different ways. The system needs one set of rules no matter how the data arrived.

## Decision

| Modality | Carriers | Mechanism |
|---|---|---|
| **A · push** | 5 | Webhooks received by a FastAPI receiver, queued in RabbitMQ, with retries |
| **B · pull** | 4 | An Airflow DAG polls their REST APIs every 30 minutes, within each API's rate limit |
| **C · file** | 3 | An Airflow DAG validates and cleans CSV or Excel files delivered every 4 hours |

All three end as a row in `raw_event` and are then normalized with the **same rules**. A webhook that fails 5 times goes to a
dead-letter queue with an alarm and is reprocessed later.

## Consequences

- Adding a carrier changes the mapping data, not the rules.
- Each modality needs its own simulator to be tested: type A is covered by the [webhook simulator](../simulator/overview.md),
  and type C by the file simulator of `HU-19`. See [Sprint 2 · week 2](../sprint-2/week-2.md).
- RabbitMQ becomes a critical component. Its Docker Compose service is in the branch `feature/RIWI-111`.

## Evidence

[Architecture v1](../sprint-1/architecture-v1.md), [Data flow](../sprint-1/data-flow.md).
