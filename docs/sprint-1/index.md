---
id: index
title: Sprint 1 overview
sidebar_position: 1
---

# Sprint 1: understand the business and design the system

**Sprint:** KAN Sprint 1 · **Observed dates:** 25 September to 6 October 2026 · **Stories:** `US-01` to `US-09` · **Jira
status:** all 9 stories and their 26 subtasks are *Finalizado*

## Goal

Before writing the application, the team needed to **understand the business**, agree on what the rules mean, and **design the
system**: its states, its architecture, its data and its foundations. Sprint 1 produced the design and the project base that
sprint 2 started to implement.

## What was defined

| Question | Answer | Read |
|---|---|---|
| What are the business rules? | Ten rules, each traced to a component, a requirement, an acceptance criterion and a test | [Business rules](./business-rules.md) |
| What language does the system speak? | 8 canonical states with valid transitions and a rule that protects final states | [Canonical states](./canonical-states.md) |
| How is the system built? | A layered AWS design: real time, batch, data lake and analytics | [Architecture v1](./architecture-v1.md) |
| How does data get in? | Push, pull and file ingestion converge on one raw store | [Data flow](./data-flow.md) |
| What data is kept? | Operational WMS, control tower tracking and an analytics star schema | [Data model](./data-model.md) |
| How is the SLA counted? | In business days, with a 16:00 cut-off and destination holidays | [SLA and delay](./sla-and-delay.md) |
| How is it tested with realistic data? | A reproducible seed with controlled scenarios and defects | [Seed data](./seed-data.md) |
| What was set up to start? | FastAPI skeleton, Docker, repository conventions and decision records | [Backend foundations](./backend-foundations.md) |

## Stories

| Story | Jira | Title | Owner | Epic |
|---|---|---|---|---|
| `US-01` | RIWI-11 | [Translate business rules into technical specifications](./business-rules.md) | Helda Reyes | Business Understanding and Rules Alignment |
| `US-02` | RIWI-12 | [Design the canonical state catalog](./canonical-states.md) | Julian Vanegas | Business Understanding and Rules Alignment |
| `US-03` | RIWI-19 | [Define end-to-end architecture v1](./architecture-v1.md) | Alexandra Peña Orozco | Architecture and Data Model |
| `US-04` | RIWI-25 | [Design the operational data model (WMS)](./data-model.md) | Alexandra Peña Orozco | Architecture and Data Model |
| `US-05` | RIWI-30 | [Build mock database seeding script](./seed-data.md) | Helda Reyes | Data Seeding |
| `US-06` | RIWI-36 | [Scaffold the FastAPI skeleton](./backend-foundations.md#us-06--fastapi-skeleton) | Alexandra Peña Orozco | Backend Foundations |
| `US-07` | RIWI-40 | [Dockerize the first backend component](./backend-foundations.md#us-07--dockerize-the-first-backend-component) | Julian Vanegas | Backend Foundations |
| `US-08` | RIWI-44 | [Organize the Git repository](./backend-foundations.md#us-08--organize-the-git-repository) | Alexandra Peña Orozco | Project Management and Documentation |
| `US-09` | RIWI-48 | [Maintain architecture document and decision records](./backend-foundations.md#us-09--architecture-document-and-decision-records) | Julian Vanegas | Project Management and Documentation |

The subtasks of each story are in [User stories](../project/user-stories.md).

## Decisions taken

The design choices of this sprint are recorded as ADRs:

| Record | Decision |
|---|---|
| [ADR-0001](../decisions/0001-backend-stack.md) | FastAPI, async SQLAlchemy and PostgreSQL |
| [ADR-0002](../decisions/0002-docker-compose-and-migrations.md) | Docker Compose, multi-stage image and migrations on start |
| [ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md) | 8 canonical states with a database-backed mapping |
| [ADR-0009](../decisions/0009-immutable-raw-events.md) | Raw events stored unchanged and de-duplicated by hash |
| [ADR-0010](../decisions/0010-three-ingestion-modalities.md) | Push, pull and file ingestion |
| [ADR-0011](../decisions/0011-data-lake-and-star-schema.md) | Layered data lake and star schema |
| [ADR-0012](../decisions/0012-utc-and-business-calendars.md) | UTC storage with calendars by country |

## Open at the end of the sprint

| Item | Detail |
|---|---|
| Ambiguities of `US-01` | AMB-01 to AMB-05 are still pending a team decision. See [Business rules](./business-rules.md#open-ambiguities) |
| Approvals of `US-02` | The mapping table needs team approval and the diagram needs validation by a second person |
| Vocabulary | Business state names (`CREADO`…) and code names (`CREATED`…) both exist. A single official vocabulary should be chosen |
| Pull request template | Planned in `US-08`; not found on `main` |

## Next

[Sprint 2 · week 1](../sprint-2/week-1.md) starts turning this design into code.
