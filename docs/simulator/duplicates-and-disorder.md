---
id: duplicates-and-disorder
title: Duplicates and out-of-order events
sidebar_position: 5
---

# Duplicates and out-of-order events

Real carriers retry webhooks and sometimes deliver them out of order. The simulator reproduces both problems with two
**independent** probabilities.

## How each batch is built

1. Several shipments are generated, each with its events in the order in which they happened.
2. The shipments are **shuffled together**, without altering the internal order of each one.
3. **Out of order:** with probability `SIM_OUT_OF_ORDER_RATE`, an event is swapped with a later event **of the same shipment**.
   For example, "Delivered" arrives before "Out for delivery".
4. **Duplicates:** with probability `SIM_DUPLICATE_RATE`, an event is resent **byte-for-byte identical** (same identifier and
   same content), between 0 and `SIM_DUPLICATE_MAX_DELAY` messages later.

## Guarantees

| Guarantee | Detail |
|---|---|
| Rate 0 | No duplicates and no disorder |
| Rate 1 | Every event is duplicated (or reordered whenever possible) |
| Same events | Disorder never loses or invents events |
| Identical duplicate | Same message, same event identifier |
| Reproducible | With the same seed (`SIM_SEED`) the sequence is the same |

## How they are counted

| Figure | Meaning |
|---|---|
| Messages | Everything sent, including duplicates |
| Unique | Distinct events |
| Duplicates | Identical resends |
| Out of order | Events that arrive after a more recent event of the same shipment |

:::tip For ingestion
A correct receiver must be **idempotent** (ignore an event identifier it has already seen) and **tolerate disorder** (sort by
event time, not arrival time, and never move a delivered shipment backwards).
:::
