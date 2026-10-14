---
id: problem-and-goals
title: Problem and goals
sidebar_position: 1
---

# Problem and goals

## The company and its problem

CargaExpress is a **3PL logistics operator**: it provides warehousing, picking and distribution services to client brands.
The last mile is outsourced to **12 carriers**, and every carrier tracks shipments in its own way.

| Pain | What it looks like today |
|---|---|
| **Many languages** | Each carrier uses its own status codes and event formats. One carrier alone can have around 14 different codes that all mean "delivered" |
| **Messy data** | Events arrive out of order, duplicated, for guides that do not exist, or after an order was already delivered |
| **No early warning** | There is no advance warning of SLA breaches; the goal is to give it 24 hours ahead |
| **Unclear responsibility** | It is hard to tell whether a delay belongs to the distribution center, the carrier or the brand |
| **Slow settlement** | The biweekly settlement takes about 4 days today; the goal is under 2 hours |
| **Brand complaints** | Complaints from brands are a business problem; the goal is to reduce them by 30% |

## The solution in one sentence

**CargaExpress Control Tower** receives the events of every carrier, translates them into one shared vocabulary, calculates
SLA and risk, assigns responsibility, calculates penalties and settles them, and exposes the result through APIs and a
dashboard.

![One-page summary of the CargaExpress Control Tower](/img/control-tower-summary.webp)

## What the system does

| Step | Name | What it covers |
|---|---|---|
| 1 | **Receive and unify** | Secure event intake, one language of 8 statuses, no event is ever lost, editable status mapping |
| 2 | **Calculate and decide** | SLA in business days, risk alert 24 hours ahead, clear owner of each delay, likely cause per order |
| 3 | **Settle and notify** | Automatic penalties passed on to whoever caused the delay, biweekly netting in under 2 hours, underperforming carriers flagged |
| + | **Trusted data** | One source of truth plus history for analytics, with no personal data in reports |
| + | **Security and operations** | Access per brand, alarms, high availability and backups |

## Data sources

| Source | Content |
|---|---|
| **12 carriers** | Webhooks, APIs and files, each with its own statuses. See [data flow](../sprint-1/data-flow.md) |
| **Warehouse (WMS)** | Orders, picking and dispatch |
| **Contracts and calendar** | SLAs, penalties and public holidays |
| **History (DataCo)** | About 180,000 past orders, used for comparison |

## Who gets the value

| Who | What they get |
|---|---|
| Brands | Order status, SLA and penalties |
| Carriers | Penalties attributed to them, and their events |
| Control tower team | At-risk orders and the likely cause |
| Finance | Net biweekly settlement |
| Management | A Power BI compliance dashboard |

## Business goals

| Goal | Target |
|---|---|
| Advance warning of SLA breaches | **24 hours** |
| Carrier-attributable penalties that are passed on | **100%** |
| Brand complaints | **−30%** |
| Biweekly settlement time | **under 2 hours** (today: 4 days) |

## Where the requirements come from

The business rules (RN-01 to RN-10), functional requirements (RF-xx), acceptance criteria (CA-xx) and deliverables (E-xx)
come from the project requirements document delivered to the team. This site translates them into technical form in
[Business rules](../sprint-1/business-rules.md). See [Sources and gaps](./sources.md) for what was used to write each page.
