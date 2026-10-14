---
id: 0009-immutable-raw-events
title: "ADR-0009: Immutable raw events"
sidebar_position: 10
---

# ADR-0009: Raw events are stored unchanged and de-duplicated by hash

**Status:** Proposed in the architecture design · **Origin:** US-03, US-04

## Context

Carriers send events in different formats, sometimes twice, sometimes wrong. If the system only kept its interpretation of
each event, a mistake in the rules could not be repaired and a lost message could not be proven.

## Decision

- Every incoming message is stored first, **unchanged**, in `raw_event` with its original payload, the receiving time and a
  **hash**.
- The hash is **unique**, so an identical repeated message cannot be stored twice (acceptance criterion CA-05).
- `raw_event` is **immutable** and partitioned by month. A copy also goes to the S3 Bronze layer.
- Interpreted data (`tracking_event`) is derived from it, so it can be **reprocessed** whenever the rules change.

## Consequences

- No event is ever lost, and any result can be traced back to the original message.
- Duplicates are caught by the hash. A retried message that differs in a field has a different hash and must be handled by
  the later normalization step.
- Storage grows with every message, which is why the table is partitioned.

## Evidence

[Data model](../sprint-1/data-model.md), [Data flow](../sprint-1/data-flow.md). The seed repository documents the same behavior
for `raw_event.hash`. See [Seed data](../sprint-1/seed-data.md).
