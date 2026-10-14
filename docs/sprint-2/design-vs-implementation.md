---
id: design-vs-implementation
title: Design versus implementation
sidebar_position: 4
---

# Design versus implementation

Sprint 1 designed the system; Sprint 2 implemented part of it. This page lists where the code in `main` differs from the design,
so nobody has to discover it by reading both. The reasons are stated only where a source gives them.

| Topic | Sprint 1 design | Implementation in `main` |
|---|---|---|
| Canonical state names | Spanish business names (`CREADO`, `ENTREGADO`, ...) in an `ENUM` | English code names (`CREATED`, `DELIVERED`, ...) in a `CHECK` constraint. See [canonical states](../sprint-1/canonical-states.md) and [ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md) |
| State mapping | Versioned `mapeo_estado` with validity dates and a version number | `state_mapping(carrier_id, raw_status, canonical_status)` with a unique pair; no versioning |
| Transition rules | `transicion_valida` table to enforce RN-02 | Not implemented; order status updates are direct |
| Unmapped statuses | Store as `SIN_MAPEO` and raise an alert (`anomalia_evento`) | The resolve endpoint answers `404`; nothing is stored |
| Mapping cache | Not specified | In-memory, 300 s lifetime, invalidated on every committed write ([ADR-0004](../decisions/0004-state-mapping-cache.md)) |
| Tables | 25 tables in the seed repository (WMS, tower, tracking, star schema) | 11 WMS tables plus `state_mapping`; tracking and star-schema layers are not in the backend |
| Mapping API | One configurable mapping | Two parallel APIs: HU-12 `/admin/state-mappings` and HU-15 `/admin/mapeo-estados`; the second is not registered in `app/main.py` |
| Order update endpoint | `PATCH /pedidos/{id}/despacho` (Jira HU-13) | Served as `PATCH /pedidos/{id}/status` |
| Route language | Not specified | Mixed Spanish (`pedidos`) and English (`admin/state-mappings`) |

## Why it matters

- The business rules RN-02 (no backwards moves from a final status) and the unmapped-status alert are acceptance material of the
  project, and are not covered by the code yet.
- The two mapping APIs should be unified or one retired; registering the HU-15 router is a one-line fix in `app/main.py`.

## Related

[Sprint 2 overview](./index.md) · [Sprint 1 data model](../sprint-1/data-model.md) · [Implemented data model](../architecture/data-model.md)
