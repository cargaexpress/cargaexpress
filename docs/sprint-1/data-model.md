---
id: data-model
title: Data model (US-04)
sidebar_position: 6
---

# Data model

**Story:** `US-04` · RIWI-25 · *Design the Operational Data Model (WMS)* · Owner: Alexandra Peña Orozco · Epic: Architecture
and Data Model · Subtasks: RIWI-26 (model the entities), RIWI-27 (one order, several guides, RN-07), RIWI-28 (validate
referential integrity)

The data design has three layers, each answering a different question:

| Layer | Question it answers | Where |
|---|---|---|
| **Operational WMS** | What was ordered, picked and dispatched? | [Below](#1-operational-wms) |
| **Control tower tracking** | Where is each guide, was it on time, who is responsible, what is owed? | [Below](#2-control-tower-tracking) |
| **Analytics star schema** | How are carriers, brands and regions performing over time? | [Below](#3-analytics-star-schema) |

Column names are shown as they appear in the design diagrams, with the English meaning of the Spanish ones.

## 1. Operational WMS

An order belongs to one brand, one distribution center, one shipping type and one region, and it can be split into **several
shipping labels (guides)**. That one-to-many relationship is rule RN-07.

```mermaid
erDiagram
    brand ||--o{ orders : places
    distribution_center ||--o{ orders : fulfils
    shipping_type ||--o{ orders : classifies
    region ||--o{ orders : "delivers to"
    orders ||--|| recipient : "has one"
    orders ||--o{ shipping_label : "split into (RN-07)"
    carrier ||--o{ shipping_label : transports
    shipping_label ||--|| dispatch : "leaves in"
    orders ||--o{ order_line : contains
    orders ||--o{ picking_task : "is picked by"
    picking_task ||--o{ picking_line : lists
    order_line ||--o{ picking_line : "is picked in"
    shipping_label ||--o{ label_line : carries
    order_line ||--o{ label_line : "is shipped in"
```

| Table | Purpose | Key columns |
|---|---|---|
| `brand` | Client brand | `brand_id`, `nombre` (name), `es_premium` (is premium) |
| `distribution_center` | Warehouse that fulfils orders | `cd_id`, `nombre`, `ciudad` (city), `pais` (country), `zona_horaria` (time zone) |
| `shipping_type` | Service type | `tipo_envio_id`, `nombre` |
| `region` | Destination region | `region_id`, `nombre`, `pais` |
| `carrier` | Transport carrier | `carrier_id`, `nombre`, `modalidad` (A, B or C), `estado` (status) |
| `orders` | The order | `order_id`, `brand_id`, `cd_id`, `tipo_envio_id`, `region_id`, `referencia_marca` (brand reference, unique), `created_at` |
| `recipient` | Personal data of the receiver, isolated for RN-10 | `order_id`, `nombre`, `email`, `direccion` (address), `telefono` (phone) |
| `shipping_label` | The guide | `label_id`, `order_id`, `carrier_id`, `numero_guia` (guide number, unique), `valor_flete` (freight value) |
| `dispatch` | One dispatch per guide | `dispatch_id`, `label_id` (one to one), `despachado_en` (dispatched at) |
| `order_line` | A product line of an order | `line_id`, `order_id`, `num_linea`, `sku`, `cantidad` (quantity), `valor_unitario` |
| `picking_task` | Warehouse picking work | `picking_id`, `order_id`, `inicio` (start), `fin` (end), `estado` |
| `picking_line` | Quantity requested and picked per line | `picking_id`, `line_id`, `cant_solicitada`, `cant_alistada` |
| `label_line` | Which lines and quantities travel in each guide | `label_id`, `line_id`, `cantidad` |

### Integrity rules

- Foreign keys to the catalogs (brand, carrier, distribution center) use `ON DELETE RESTRICT`.
- Unique: `(brand_id, referencia_marca)` and `(carrier_id, numero_guia)`.
- Checks: `cantidad > 0` and `cant_alistada <= cant_solicitada`.
- Dates are `timestamptz` in UTC, and the 16:00 cut-off follows the time zone of the distribution center.
- RN-07: an order meets the SLA only if all of its guides do.
- RN-10: personal data is isolated in `recipient`.

## 2. Control tower tracking

This layer goes from the carriers' events to the SLA, penalties and settlement. Tables marked WMS come from the layer above.

```mermaid
erDiagram
    carrier ||--o{ raw_event : sends
    carrier ||--o{ carrier_status_map : "is translated by"
    raw_event ||--o{ tracking_event : "becomes"
    raw_event ||--o{ unmatched_event : "or is unmatched"
    shipping_label ||--|| shipment_status : "has current"
    tracking_event }o--|| shipment_status : updates
    shipment_status ||--|| shipment_sla : "is measured by"
    shipment_sla ||--o| penalty : "may cause"
    settlement ||--o{ penalty : "groups"
    sla_rule }o..o{ shipment_sla : "applies to"
    calendar_day }o..o{ shipment_sla : "business days"
    penalty_rule }o..o{ penalty : "percentage tiers"
    penalty }o..o{ carrier_compliance : "feeds"
```

| Table | Purpose | Key columns |
|---|---|---|
| `raw_event` | Original message, never modified | `raw_id`, `carrier_id`, `modalidad`, `payload` (json), `recibido_en` (received at), `hash` (unique) |
| `tracking_event` | Interpreted event | `event_id`, `raw_id`, `label_id`, `carrier_id`, `estado_canonico`, `ocurrio_en` (occurred at, UTC), `es_anomalia` (is anomaly) |
| `shipment_status` | Current state of each guide | `label_id`, `estado_actual`, `actualizado_en`, `novedad_abierta_desde` (issue open since) |
| `carrier_status_map` | Versioned translation of carrier codes | `map_id`, `carrier_id`, `estado_origen`, `estado_canonico`, `vigente_desde`, `vigente_hasta`, `version` |
| `unmatched_event` | Events for guides that do not exist in the WMS, with no foreign key on purpose | `unmatched_id`, `raw_id`, `carrier_id`, `numero_guia`, `motivo` (reason) |
| `sla_rule` | Business days allowed | `regla_id`, `brand_id`, `tipo_envio_id`, `region_id`, `dias_habiles` (business days) |
| `shipment_sla` | Deadline, delay, responsible and risk per guide | `label_id`, `fecha_limite` (deadline), `dias_retraso` (days late), `responsable`, `en_riesgo` (at risk) |
| `calendar_day` | Business days and holidays per country | `pais`, `fecha`, `es_habil`, `es_festivo`, `hora_corte` (cut-off time) |
| `penalty_rule` | Percentage of freight per delay tier | `tramo_id`, `dias_desde`, `dias_hasta`, `pct_flete` |
| `penalty` | Penalty per guide | `penalty_id`, `label_id`, `dias_retraso`, `monto_marca` (amount to the brand), `monto_traslado` (amount passed to the carrier), `responsable`, `settlement_id` |
| `settlement` | Half-month settlement per brand | `settlement_id`, `brand_id`, `quincena_inicio`, `quincena_fin` (half-month start and end), `a_pagar_marca`, `a_cobrar_transportadora`, `neto` (net) |
| `carrier_compliance` | Compliance per carrier and half-month | `carrier_id`, `quincena`, `cumplimiento_pct`, `en_revision` (under review) |

### Design decisions

- `raw_event` is immutable and partitioned by month, and its hash avoids duplicates (CA-05).
- `tracking_event` is unique per `(carrier_id, label_id, estado_canonico, ocurrio_en)`.
- A final state is never replaced: a later event is flagged as an anomaly (RN-02).
- `unmatched_event` keeps guides with no order in the WMS, without a foreign key on purpose.
- `carrier_status_map` changes without redeploying and keeps its versions (RN-01).
- Everything is in UTC, with the time zone and cut-off taken from the distribution center and the country (RN-03).
- A carrier below 85% for two half-months goes under review (RN-09).

## 3. Analytics star schema

The analytical layer (Gold) is a **star schema**, not a snowflake: flat dimensions that are simple for Power BI. The carrier
dimension keeps its history (slowly changing dimension type 2).

```mermaid
erDiagram
    dim_fecha ||--o{ fact_envio : "dispatch and delivery date"
    dim_marca ||--o{ fact_envio : brand
    dim_transportadora ||--o{ fact_envio : carrier
    dim_cd ||--o{ fact_envio : "distribution center"
    dim_region ||--o{ fact_envio : region
    dim_tipo_envio ||--o{ fact_envio : "shipping type"
```

| Table | Kind | Purpose |
|---|---|---|
| `fact_envio` | Fact | **One row per guide.** Keys to every dimension, the order and guide numbers, `dias_transito` (days in transit), `dias_retraso` (days late), `cumplio_sla` (met SLA) and `valor_flete` |
| `fact_pedido_sla` | Fact | One row per order: number of guides, guides on time, and whether all of them met the SLA |
| `fact_penalidad` | Fact | Penalties: amount to the brand, amount passed on, responsible party and half-month |
| `fact_evento` | Fact | Events: canonical state and anomaly flag |
| `dim_fecha` | Dimension | Date, country, business day, holiday, half-month, month. Used in two roles: dispatch and delivery |
| `dim_marca` | Dimension | Brand and whether it is premium |
| `dim_transportadora` | Dimension (type 2) | Carrier with `vigente_desde`, `vigente_hasta` and `es_actual` to keep history |
| `dim_cd` | Dimension | Distribution center, city, country, time zone |
| `dim_region` | Dimension | Region, country, time zone |
| `dim_tipo_envio` | Dimension | Shipping type and its SLA in business days |

The other fact tables share the same dimensions: date, brand, carrier, distribution center and region.

## What exists in code today

| Layer | Implementation |
|---|---|
| Operational WMS | The backend models 11 tables plus `state_mapping`. See [Implemented data model](../architecture/data-model.md). The `cargaexpress_seed` repository models the fuller design, with 25 tables from the ERDs. See [Seed data](./seed-data.md) |
| Control tower tracking | Modeled in `cargaexpress_seed`. The backend has only `state_mapping`, a simpler version of `carrier_status_map` |
| Star schema | Not found in the repositories reviewed |

## Related

[Data flow](./data-flow.md) · [SLA and delay](./sla-and-delay.md) · [Canonical states](./canonical-states.md) ·
[ADR-0009](../decisions/0009-immutable-raw-events.md) · [ADR-0011](../decisions/0011-data-lake-and-star-schema.md)
