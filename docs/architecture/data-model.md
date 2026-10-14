---
id: data-model
title: Data model
sidebar_position: 2
---

# Data model

The initial migration creates 11 WMS tables and the HU-12 migrations add `state_mapping`, for **12 application tables** in
total. Models live in `backend/app/models/`, one file per table, and are registered with Alembic in `backend/alembic/env.py`.

| Table | Purpose |
|---|---|
| `brands` | Brands that place orders |
| `distribution_centers` | Warehouses that fulfil orders |
| `shipment_types` | Shipment type catalog |
| `carriers` | Transport carriers |
| `orders` | Orders, with brand, distribution center, shipment type, destination and status |
| `order_lines` | Order lines (SKU, description, quantity) |
| `order_recipients` | Recipient of each order (required, one per order) |
| `dispatches` | Dispatches |
| `picking_tasks` | Picking tasks |
| `shipping_labels` | Shipping labels |
| `shipping_label_items` | Items on each shipping label |
| `state_mapping` | Translation of each carrier's raw status to a canonical status |

## `state_mapping`

| Column | Notes |
|---|---|
| `id` | Primary key |
| `carrier_id` | Foreign key to `carriers.carrier_id` |
| `raw_status` | The status exactly as the carrier sends it |
| `canonical_status` | One of the 8 canonical statuses, enforced by a `CHECK` constraint |
| `created_at`, `updated_at` | Audit timestamps |

A unique constraint on `(carrier_id, raw_status)` allows only one translation per carrier status.

## Migrations

| Revision | What it does |
|---|---|
| `dee4876a63bd` | Creates the WMS tables |
| `a3f1c9d27b45` | Creates `state_mapping` |
| `b7e24d51c8a9` | Seeds the simulated carriers and their mappings |
| `c4a1209b7e6f` | HU-12: aligns column names, moves obsolete statuses to `EXCEPTION`, adds loss/damage mappings and the catalog constraint |

Migrations run automatically when the backend container starts. The current head is `c4a1209b7e6f`. No sample orders are
seeded.
