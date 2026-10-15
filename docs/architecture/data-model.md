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

## Entity-relationship diagram

The same 12 tables as a diagram, taken from the second page of the team's draw.io file
([`cargaexpress-architecture.drawio`](pathname:///files/cargaexpress-architecture.drawio)). Names here are the logical entities;
the physical table names are in the list above.

```mermaid
erDiagram
    BRAND ||--o{ ORDER : has
    DISTRIBUTION_CENTER ||--o{ ORDER : serves
    DISTRIBUTION_CENTER ||--o{ DISPATCH : manages
    SHIPMENT_TYPE ||--o{ ORDER : classifies
    CARRIER ||--o{ DISPATCH : handles
    CARRIER ||--o{ SHIPPING_LABEL : ships
    CARRIER ||--o{ STATE_MAPPING : translates
    ORDER ||--|| ORDER_RECIPIENT : has
    ORDER ||--o{ ORDER_LINE : contains
    ORDER ||--o{ SHIPPING_LABEL : emits
    ORDER_LINE ||--o{ PICKING_TASK : tracks
    ORDER_LINE ||--o{ SHIPPING_LABEL_ITEM : included_in
    DISPATCH ||--o{ SHIPPING_LABEL : assigns
    SHIPPING_LABEL ||--o{ SHIPPING_LABEL_ITEM : contains

    BRAND {
        bigint brand_id PK
        varchar name
        varchar tier
        bool is_active
        datetime created_at
    }

    DISTRIBUTION_CENTER {
        bigint dc_id PK
        varchar code
        varchar name
        varchar city
        char(2) country_code
    }

    SHIPMENT_TYPE {
        varchar shipment_type_code PK
        varchar description
    }

    CARRIER {
        bigint carrier_id PK
        varchar name
        varchar integration_type
        varchar status
        datetime created_at
    }

    ORDER {
        bigint order_id PK
        bigint brand_id FK
        bigint dc_id FK
        varchar shipment_type_code FK
        varchar brand_order_ref
        char(2) destination_country
        varchar destination_region
        numeric(12,2) freight_value
        varchar status
        datetime created_at
    }

    ORDER_RECIPIENT {
        bigint order_id PK, FK
        varchar full_name
        varchar email
        varchar phone
        varchar address_line
        varchar city
    }

    ORDER_LINE {
        bigint order_line_id PK
        bigint order_id FK
        int line_number
        varchar sku
        varchar description
        int quantity_ordered
    }

    PICKING_TASK {
        bigint picking_id PK
        bigint order_line_id FK
        varchar picker_ref
        int quantity_picked
        varchar status
        datetime started_at
        datetime completed_at
    }

    DISPATCH {
        bigint dispatch_id PK
        bigint dc_id FK
        bigint carrier_id FK
        datetime dispatched_at
    }

    SHIPPING_LABEL {
        bigint label_id PK
        bigint order_id FK
        bigint carrier_id FK
        bigint dispatch_id FK
        varchar tracking_number
        varchar status
        numeric(8,3) weight_kg
        datetime created_at
    }

    SHIPPING_LABEL_ITEM {
        bigint label_id PK, FK
        bigint order_id FK
        bigint order_line_id PK, FK
        int quantity
    }

    STATE_MAPPING {
        bigint id PK
        bigint carrier_id FK
        varchar raw_status
        varchar canonical_status
        datetime created_at
        datetime updated_at
    }
```

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
