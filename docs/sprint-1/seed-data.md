---
id: seed-data
title: Seed data (US-05)
sidebar_position: 8
---

# Mock database seed

**Story:** `US-05` · RIWI-30 · *Build Mock Database Seeding Script* · Owner: Helda Reyes · Epic: Data Seeding · Subtasks:
RIWI-31 and RIWI-32 (seeding script with a fixed seed value), RIWI-33 (idempotency), RIWI-34 (configurable data quality defects)

**Repository:** `cargaexpress/cargaexpress_seed`

A command that fills the database with mock data. The data is realistic, always the same for the same settings, and safe to
run many times. It exists so every developer has the same dataset from day one, and so the business rules (RN-01 to RN-10) and
the data quality checks can be tested without waiting for real data.

## What it creates

Brands, carriers, distribution centers, orders, guides, tracking events, SLA results, penalties, settlements and carrier
compliance. The project models 25 tables taken from the ERDs.

## How to run it

```bash
docker compose up -d                       # PostgreSQL on localhost:5432
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m seed --size small --seed 42
```

| Option | Meaning | Default |
|---|---|---|
| `--size` | `small`, `medium` or `large` | `small` |
| `--seed` | Any integer; makes the data reproducible | `42` |
| `--defects` | Comma-separated list of data quality defects | none |
| `--database-url` | Database to use | `DATABASE_URL`, or the Docker database |
| `--reset` | Drops and recreates the tables first | off |

## Volumes

| Size | Brands | Orders | Records touched by each defect |
|---|---|---|---|
| `small` | 5 | 100 | 5 |
| `medium` | 20 | 2,000 | 25 |
| `large` | 60 | 20,000 | 100 |

It always creates 12 carriers (5 type A, 4 type B, 3 type C), 9 distribution centers, 9 regions and 3 shipping types. An order
has 1 to 3 guides.

## Fixed scenario orders

Orders whose reference starts with `SCN-` always exist, with the same dates, for every size and seed. They are the controlled
cases of the business rules.

| Reference | Case |
|---|---|
| `SCN-01` | Normal dispatch, delivered inside the SLA |
| `SCN-02` | Dispatch on Friday at 17:00, after the 16:00 cut-off, with a Monday holiday (the CA-02 example) |
| `SCN-03` | Late delivery, carrier responsible, penalty passed to the carrier |
| `SCN-04` | Dispatch took 54 hours, distribution center responsible |
| `SCN-05` | Wrong-address issue, brand responsible, no penalty |
| `SCN-06` | One order with 2 guides, one on time and one late (RN-07) |
| `SCN-07` | An event arrives after `DELIVERED` (RN-02) |
| `SCN-08` | Dispatched on a Saturday, 14 business hours to the deadline, still in transit: at risk |
| `SCN-09` | Same dates as `SCN-08` but already out for delivery: not at risk |
| `SCN-10` | An issue open for 16 hours: at risk |
| `SCN-11` | Dispatched on a public holiday |
| `SCN-12` | Distribution center in Mexico, destination Peru: the destination calendar is used |

Carrier 12 stays under 85% compliance for two consecutive half-months and is `UNDER_REVIEW` (RN-09). Carrier 11 has only one
bad period and stays `ACTIVO`.

## Data quality defects

Enable them with `--defects name1,name2`. Each defect is deterministic, touches only a few records and is marked inside
`raw_event.payload` with the key `seed_defect`. Normal data is never changed.

| Defect | What it creates |
|---|---|
| `mixed_dates` | The date inside the raw message uses another format: `dd/mm/yyyy HH:MM`, `mm-dd-yyyy HH:MM`, epoch seconds or `yyyymmddHHMMSS` |
| `out_of_order_events` | Two events of a guide arrive in the wrong order; the late one is flagged as an anomaly |
| `duplicate_webhooks` | A repeated webhook from a type A carrier, with an extra `retry` field so its hash differs |
| `invalid_tracking` | Messages for guides that do not exist (`INVALID-000001` onward) plus `unmatched_event` rows |

`repeated_headers` is not implemented, because it only exists inside Excel or CSV files and this seed fills database tables.

## Reproducibility and idempotency

- One `--seed` number feeds every random choice, and each order has its own generator, so an order never depends on how many
  were built before it.
- The code never reads the clock: "now" is fixed to 1 July 2026, 15:00 UTC. IDs come from counters.
- Every insert is `ON CONFLICT DO NOTHING`, so running it twice skips existing rows and never updates or deletes them.
- Everything is written in one transaction.
- **Rule:** one database means one size, one seed and one set of defects. Use `--reset` to change settings.

## Tests

The tests use a temporary SQLite file, so Docker is not needed.

| File | Checks |
|---|---|
| `test_1_basic_execution.py` | The command creates the whole dataset |
| `test_2_reproducibility.py` | Seed 42 gives the same dataset twice |
| `test_3_idempotency.py` | Running twice does not duplicate anything |
| `test_4_volumes.py` | Small, medium and large have the configured size |
| `test_5_defects.py` | Each defect creates its anomaly and is marked |
| `test_6_existing_data.py` | Existing data is not overwritten, duplicated or deleted |
| `test_business_rules.py` | RN-01 to RN-10 can be tested with the seeded data |
| `test_calendar_utils.py` | Business-day and cut-off math |

## Values the project did not define

The project documents do not define these, so the seed uses test values: the three countries (Colombia, Mexico and Peru), a
short sample of holidays that is not an official calendar, SLA days (STANDARD 3, EXPRESS 2, ECONOMY 5, plus 1 for the third
region of each country), penalty tiers (1 to 2 days 5%, 3 to 5 days 10%, 6 or more days 20%), the 14 carrier status codes and
the volumes. These match the open decisions AMB-03 and others in [Business rules](./business-rules.md#open-ambiguities).

## Related

[Data model](./data-model.md) · [SLA and delay](./sla-and-delay.md) · [Business rules](./business-rules.md)
