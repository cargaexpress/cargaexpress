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
| Sprint 2 stories (`HU-11` to `HU-19`) | 8 in the export, all *Finalizado* in Jira |
| Subtasks | 47, all *Finalizado* in Jira |

## Repositories

| Repository | Content |
|---|---|
| `cargaexpress_control_tower` | Backend API (FastAPI, PostgreSQL, Docker). Work in progress lives in feature branches |
| `cargaexpress_seed` | Database seed with defect injection and the 25-table ERD |
| `simulator-docosaurus` | This documentation site |

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
| HU-15 router | Register `admin_mapeo_estados` in `app/main.py`, or the two routes are not served |
| Merge the feature branches | Open pull requests so the work above reaches `main` |
| Webhook ingestion endpoint | The backend cannot receive carrier events yet. The simulators are ready to test it |
| RN-02 | Block moves backwards from terminal statuses and record anomalies. Order status updates are direct today |
| Delta and Epsilon in the backend | The webhook simulator has them, but the backend has no carrier or status mapping for them |
| Unfinished stories | Not in the export; they will be added with an unfiltered export |
| Simulator Docker test | `docker compose up --build` for the simulator has not been run on a machine with Docker |

## Open questions

| Question | Why it matters |
|---|---|
| Two APIs edit the same table | HU-12 (`/admin/state-mappings`, one row at a time) and HU-15 (`/admin/mapeo-estados`, whole carrier at once) both change `state_mapping`. The team should confirm both are wanted |
| Mixed route naming | Some routes are in Spanish (`pedidos`, `mapeo-estados`) and others in English (`state-mappings`, `health`). A single convention should be decided and recorded as an ADR |
| Order endpoint name | Jira (HU-13) names `PATCH /pedidos/{id}/despacho`, but the code serves `PATCH /pedidos/{id}/status` |
| Pull request template | US-08 lists it as done, but none was found on `main` |
