---
id: statuses
title: Status catalog
sidebar_position: 3
---

# Status catalog per carrier

Each carrier has **10 or 11 statuses of its own** (the required minimum is 6), all of them translatable to the backend's 8 canonical statuses.

:::info Relationship with the backend
Alpha, Beta and Gamma use exactly the statuses that already exist in the status mapping seeded in the backend database. **Delta and Epsilon are new**: they do not have a carrier or a mapping in the backend yet.
:::

## SimCarrier Alpha (`alpha`)

10 statuses · `json_flat` format · tracking numbers prefixed with `ALP`

| Carrier status | Canonical status | Note |
|---|---|---|
| `CREATED` | `CREATED` |  |
| `PICKED_UP` | `PICKED_UP` |  |
| `IN_TRANSIT` | `IN_TRANSIT` |  |
| `OUT_FOR_DELIVERY` | `OUT_FOR_DELIVERY` |  |
| `DELIVERED` | `DELIVERED` |  |
| `DELIVERY_ATTEMPT_FAILED` | `EXCEPTION` |  |
| `HELD_AT_CUSTOMS` | `EXCEPTION` |  |
| `CANCELLED` | `EXCEPTION` | used for cancellations |
| `RETURNED_TO_SENDER` | `RETURNED` |  |
| `LOST_OR_DAMAGED` | `LOST_OR_DAMAGED` |  |

## SimCarrier Beta (`beta`)

10 statuses · `json_nested` format · tracking numbers prefixed with `BET`

| Carrier status | Canonical status | Note |
|---|---|---|
| `100` | `CREATED` |  |
| `200` | `PICKED_UP` |  |
| `300` | `IN_TRANSIT` |  |
| `400` | `OUT_FOR_DELIVERY` |  |
| `500` | `DELIVERED` |  |
| `600` | `EXCEPTION` |  |
| `900` | `EXCEPTION` |  |
| `800` | `EXCEPTION` | used for cancellations |
| `700` | `RETURNED` |  |
| `999` | `LOST_OR_DAMAGED` |  |

## SimCarrier Gamma (`gamma`)

10 statuses · `json_es` format · tracking numbers prefixed with `GAM`

| Carrier status | Canonical status | Note |
|---|---|---|
| `Generada` | `CREATED` |  |
| `Recolectada` | `PICKED_UP` |  |
| `En tránsito` | `IN_TRANSIT` |  |
| `En reparto` | `OUT_FOR_DELIVERY` |  |
| `Entregada` | `DELIVERED` |  |
| `Intento fallido` | `EXCEPTION` |  |
| `Novedad` | `EXCEPTION` |  |
| `Cancelada` | `EXCEPTION` | used for cancellations |
| `Devuelta al remitente` | `RETURNED` |  |
| `Perdida o dañada` | `LOST_OR_DAMAGED` |  |

## SimCarrier Delta (`delta`)

11 statuses · `xml` format · tracking numbers prefixed with `DEL`

| Carrier status | Canonical status | Note |
|---|---|---|
| `NEW` | `CREATED` |  |
| `PCK` | `PICKED_UP` |  |
| `TRN` | `IN_TRANSIT` |  |
| `HUB` | `IN_TRANSIT` |  |
| `OFD` | `OUT_FOR_DELIVERY` |  |
| `DLV` | `DELIVERED` |  |
| `NDL` | `EXCEPTION` |  |
| `HLD` | `EXCEPTION` |  |
| `CNL` | `EXCEPTION` | used for cancellations |
| `RTS` | `RETURNED` |  |
| `LST` | `LOST_OR_DAMAGED` |  |

## SimCarrier Epsilon (`epsilon`)

11 statuses · `form` format · tracking numbers prefixed with `EPS`

| Carrier status | Canonical status | Note |
|---|---|---|
| `Shipment registered` | `CREATED` |  |
| `Collected from sender` | `PICKED_UP` |  |
| `Departed origin facility` | `IN_TRANSIT` |  |
| `Arrived at destination facility` | `IN_TRANSIT` |  |
| `Out for delivery` | `OUT_FOR_DELIVERY` |  |
| `Delivered to recipient` | `DELIVERED` |  |
| `Delivery attempt unsuccessful` | `EXCEPTION` |  |
| `Held - address verification` | `EXCEPTION` |  |
| `Cancelled by shipper` | `EXCEPTION` | used for cancellations |
| `Returned to shipper` | `RETURNED` |  |
| `Lost or damaged in transit` | `LOST_OR_DAMAGED` |  |

## Generated lifecycles

| Weight | Path |
|---|---|
| 55 | Created → picked up → in transit → out for delivery → delivered |
| 15 | Same, with two in-transit events |
| 10 | Exception during delivery, then delivered |
| 6 | Exception in transit, then delivered |
| 6 | Exception during delivery, then returned |
| 4 | Lost or damaged in transit |
| 4 | Created, then cancelled |

With this mix, a long simulation reaches **every** status of each catalog.
