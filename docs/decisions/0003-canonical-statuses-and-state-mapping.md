---
id: 0003-canonical-statuses-and-state-mapping
title: "ADR-0003: Canonical statuses and status mapping"
sidebar_position: 4
---

# ADR-0003: Eight canonical statuses with a database-backed mapping

**Status:** Accepted · **Origin:** HU-12

## Context

Each carrier names and codes its statuses differently (`IN_TRANSIT`, `300`, `En tránsito`, `TRN`…). The rest of the system
needs one vocabulary, and operators must be able to change translations without redeploying.

## Decision

- Exactly **8 canonical statuses**: `CREATED`, `PICKED_UP`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `EXCEPTION`, `DELIVERED`,
  `RETURNED`, `LOST_OR_DAMAGED`. `DELIVERED`, `RETURNED` and `LOST_OR_DAMAGED` are terminal.
- Translations are **data in PostgreSQL** (`state_mapping`), editable through the admin API, not code.
- The database enforces the rules: a **unique** `(carrier_id, raw_status)` pair and a **`CHECK`** that limits the canonical
  status to the catalog.
- A status with **no mapping is never guessed**: resolving it answers `404`.
- Each simulated carrier has at least six distinct source statuses.

## Consequences

- New carriers or statuses are a data change, not a release.
- Unknown statuses are visible as errors instead of being silently stored under a wrong status.
- Terminal-status rules for orders (RN-02) are a separate piece of work and are not implemented yet.

## Evidence

`STATE_MAPPING.md`, `backend/app/models/state_mapping.py`, migrations `a3f1c9d27b45`, `b7e24d51c8a9`, `c4a1209b7e6f`.
