---
id: intro
title: Welcome
slug: /
sidebar_position: 1
---

# CargaExpress Docs

Technical documentation for **CargaExpress Control Tower**, the logistics control tower that receives orders and shipments and
translates each carrier's statuses into a single vocabulary. It covers the whole tower and the decisions taken in the
project, not a single user story.

## What you will find here

| Section | Content |
|---|---|
| [Project](./project/problem-and-goals.md) | Problem, goals, user stories and backlog, team and process, costs, pitch, status and sources |
| [Sprint 1 · Design](./sprint-1/index.md) | Business rules, canonical states, architecture v1, data flow, data model, SLA, seed data |
| [Sprint 2 · Build](./sprint-2/index.md) | What was implemented in each week of the sprint |
| [Decision records](./decisions/index.md) | The decisions taken in the project, with context and consequences |
| [Architecture](./architecture/aws-architecture.md) | The AWS reference architecture, the implemented backend, data model and how to run the project |
| [Webhook simulator (HU-17)](./simulator/overview.md) | Service that simulates 5 Type A carriers sending events |

## The tower in one minute

The backend (FastAPI, async SQLAlchemy, Alembic and PostgreSQL) handles orders and a **status mapping**: each carrier names
its statuses differently and the system translates them into 8 canonical statuses.

| Canonical status | Meaning |
|---|---|
| `CREATED` | Shipment registered |
| `PICKED_UP` | Picked up |
| `IN_TRANSIT` | In transit |
| `OUT_FOR_DELIVERY` | Out for delivery |
| `EXCEPTION` | Exception (failed attempt, hold, cancellation) |
| `DELIVERED` | Delivered |
| `RETURNED` | Returned to sender |
| `LOST_OR_DAMAGED` | Lost or damaged |

## Where to start

- What problem are we solving: [problem and goals](./project/problem-and-goals.md).
- What was defined in Sprint 1: [Sprint 1 overview](./sprint-1/index.md).
- What changed since: [Sprint 2 overview](./sprint-2/index.md).
- Why things are built this way: [decision records](./decisions/index.md).
- Where we are today: [project status](./project/status.md).
- Run it: [local development guide](./architecture/local-development.md).
