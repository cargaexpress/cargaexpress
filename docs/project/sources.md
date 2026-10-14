---
id: sources
title: Sources and gaps
sidebar_position: 5
---

# Sources and gaps

This site was written from the project's own documents, not from memory. This page lists what was used, where each source
shows up, and what is still missing.

## Sources used

| Source | Where it comes from | Used in |
|---|---|---|
| Jira backlog export (72 work items) | Jira project RIWI | [User stories](./user-stories.md), [Sprints](./team-and-process.md), [Project status](./status.md) |
| *Technical Specification and Traceability Matrix for Business Rules* | Attached to `RIWI-11` (US-01) | [Business rules](../sprint-1/business-rules.md), [SLA and delay](../sprint-1/sla-and-delay.md) |
| *US-02 Canonical State Catalog* | Attached to `RIWI-12` (US-02) | [Canonical states](../sprint-1/canonical-states.md) |
| Review feedback on US-02 | Comment on `RIWI-12` | [Canonical states](../sprint-1/canonical-states.md) |
| Architecture diagrams (detailed and one-page summary) | Attached to `RIWI-19` (US-03) | [Problem and goals](./problem-and-goals.md), [Architecture v1](../sprint-1/architecture-v1.md), [Costs](./costs.md) |
| Operational WMS ERD | Attached to `RIWI-25` (US-04) | [Data model](../sprint-1/data-model.md) |
| Control tower tracking ERD | Attached to `RIWI-25` | [Data model](../sprint-1/data-model.md) |
| Carriers-to-tower data flow | Attached to `RIWI-25` | [Data flow](../sprint-1/data-flow.md) |
| Order tracking and delay time | Attached to `RIWI-25` | [SLA and delay](../sprint-1/sla-and-delay.md) |
| Star schema for the analytics layer | Attached to `RIWI-25` | [Data model](../sprint-1/data-model.md) |
| `cargaexpress_seed` repository | GitHub | [Seed data](../sprint-1/seed-data.md) |
| `cargaexpress_control_tower` repository, `main` and the sprint 2 feature branches | GitHub | [Implemented backend](../architecture/overview.md), [Sprint 2](../sprint-2/index.md) |

## Gaps

These sources were requested but were not available when this site was written. Pages that depend on them say so.

| Missing source | Effect |
|---|---|
| Original **problem and requirements document** | The business context and rules were taken from the technical specification and the one-page summary, which restate it. Requirements `RF-01`, `RF-07` and acceptance criteria `CA-07` are not described anywhere in the available documents |
| **Comics** and other project material | Not used |
| **Pitch** presentation | [Pitch](./pitch.md) was written from the one-page summary |
| **Cost sheet** | [Costs](./costs.md) only has the USD 460 per month estimate |
| Sprint 1 **architecture document** and its template (`RIWI-49`), and the initial ADRs of `RIWI-24` | The [decision records](../decisions/index.md) were reconstructed from the code and diagrams |
| **Unfinished** work items | The Jira export only contained items marked *Finalizado* |
| Confluence pages and other files stored in Jira | Not available |

If you have any of these, add them to the repository and link them from here.
