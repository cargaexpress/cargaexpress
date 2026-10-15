---
id: status
title: Project status
sidebar_position: 1
---

# Project status

A summary of where CargaExpress Control Tower stands. The detail per story is in [User stories](./user-stories.md).

:::note Source of truth
The Jira backlog (project RIWI) is the source of truth for planning. This page combines the Jira export with what is
actually in the repositories, so the two can be compared.
:::

## At a glance

| | Count |
|---|---|
| Epics in the export | 7 (plus 3 parents that were filtered out) |
| User stories (`US-01` to `US-09`) | 9, all *Finalizado* in Jira |
| Main user stories (`HU-11` to `HU-19`) | 8 in the export, all *Finalizado* in Jira |
| Subtasks | 47, all *Finalizado* in Jira |

## Repositories

| Repository | Content |
|---|---|
| `cargaexpress_control_tower` | Backend API (FastAPI, PostgreSQL, Docker). Work in progress lives in feature branches |
| `cargaexpress_seed` | Database seed with defect injection and the 25-table ERD |
| `cargaexpress` | This documentation site |

## What is in `main` of the backend

| Story | In `main` |
|---|---|
| US-06 | FastAPI skeleton, layered architecture, health check |
| US-07 | Dockerfile and Docker Compose |
| HU-11 | ORM models and the initial migration |
| HU-12 | Configurable status mapping, admin API and cache |
| HU-13 | Orders API |
| HU-15 | Code and tests are committed, but the router is **not registered** |

## Marked *Finalizado* in Jira but not merged into `main`

These stories are finished in Jira, but their code is still in feature branches of `cargaexpress_control_tower`.

| Story | Branch |
|---|---|
| HU-14 Shipping label endpoints | `feature/RIWI-68` |
| HU-16 OpenAPI/Swagger documentation | `feautre/RIWI-77` (the branch name has a typo) |
| HU-17 Webhook simulator | `feature/RIWI-82-simulador-webhooks` |
| HU-19 Type C file simulator | `feature/RIWI-88` |
| RabbitMQ in Docker Compose (RIWI-111) | `feature/RIWI-111` |

## Pending and open

| Item | Detail |
|---|---|
| HU-15 router | Register the HU-15 router in `app/main.py`, or its two routes are not served. The fix is in branch `fix/RIWI-72-register-mapping-router`, pending a pull request |
| Merge the feature branches | Open pull requests so the work above reaches `main` |
| Webhook ingestion endpoint | The backend cannot receive carrier events yet. The simulators are ready to test it |
| RN-02 | Block moves backwards from terminal statuses and record anomalies. Order status updates are direct today |
| Delta and Epsilon in the backend | The webhook simulator has them, but the backend has no carrier or status mapping for them |
| Unfinished stories | Not in the export; they will be added with an unfiltered export |
| Simulator Docker test | `docker compose up --build` for the simulator has not been run on a machine with Docker |

## Open questions

| Question | Why it matters |
|---|---|
| Two APIs edit the same table | HU-12 (`/admin/state-mappings`, one row at a time) and HU-15 (`/admin/carrier-state-mapping`, whole carrier at once) both change `state_mapping`. The team should confirm both are wanted |
| Mixed route naming | The code still serves some routes with Spanish names (`pedidos`, `mapeo-estados`, `guias`, `despacho`) and others in English (`state-mappings`, `health`). This documentation uses the English names (`orders`, `carrier-state-mapping`, `shipping-labels`, `dispatch`), which are the target. The code is being renamed, and these pages should be checked against it afterwards |
| Order endpoint name | Jira (HU-13) names `PATCH /orders/{id}/dispatch`, but the code serves `PATCH /orders/{id}/status` |
| Pull request template | US-08 lists it as done, but none was found on `main` |
