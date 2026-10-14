---
id: 0004-state-mapping-cache
title: "ADR-0004: Status mapping cache"
sidebar_position: 5
---

# ADR-0004: In-memory cache with TTL and invalidation on write

**Status:** Accepted · **Origin:** HU-12

## Context

Every incoming carrier event needs a status translation. Reading the database for each one would be wasteful, but changes to
a mapping must show up without restarting the service.

## Decision

- Mappings are **loaded on demand and kept in process memory** for `STATE_MAPPING_CACHE_TTL_SECONDS` (default 300).
- Creating, editing or deleting a mapping **invalidates the cache after the transaction commits**.

## Consequences

- In the process that handled the change, the next resolve sees the new value immediately.
- Other processes or replicas, and direct edits in the database, can take **up to the TTL** to be noticed.
- If the service is scaled to several instances and instant propagation matters, a shared cache or notifications will be needed.

## Evidence

`backend/app/services/state_mapping_cache.py`, `backend/tests/test_state_mapping_cache.py`.
