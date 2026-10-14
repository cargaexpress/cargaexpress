---
id: estados
title: Catálogo de estados
sidebar_position: 3
---

# Catálogo de estados por transportadora

Cada transportadora tiene **10 u 11 estados propios** (el mínimo exigido es 6), todos traducibles a los 8 estados canónicos del backend.

:::info Relación con el backend
Alpha, Beta y Gamma usan exactamente los estados que ya existen en el mapeo de estados sembrado en la base de datos del backend. **Delta y Epsilon son nuevas**: todavía no tienen transportadora ni mapeo en el backend.
:::

## SimCarrier Alpha (`alpha`)

10 estados · formato `json_flat` · guías con prefijo `ALP`

| Estado propio | Estado canónico | Nota |
|---|---|---|
| `CREATED` | `CREATED` |  |
| `PICKED_UP` | `PICKED_UP` |  |
| `IN_TRANSIT` | `IN_TRANSIT` |  |
| `OUT_FOR_DELIVERY` | `OUT_FOR_DELIVERY` |  |
| `DELIVERED` | `DELIVERED` |  |
| `DELIVERY_ATTEMPT_FAILED` | `EXCEPTION` |  |
| `HELD_AT_CUSTOMS` | `EXCEPTION` |  |
| `CANCELLED` | `EXCEPTION` | se usa para cancelaciones |
| `RETURNED_TO_SENDER` | `RETURNED` |  |
| `LOST_OR_DAMAGED` | `LOST_OR_DAMAGED` |  |

## SimCarrier Beta (`beta`)

10 estados · formato `json_nested` · guías con prefijo `BET`

| Estado propio | Estado canónico | Nota |
|---|---|---|
| `100` | `CREATED` |  |
| `200` | `PICKED_UP` |  |
| `300` | `IN_TRANSIT` |  |
| `400` | `OUT_FOR_DELIVERY` |  |
| `500` | `DELIVERED` |  |
| `600` | `EXCEPTION` |  |
| `900` | `EXCEPTION` |  |
| `800` | `EXCEPTION` | se usa para cancelaciones |
| `700` | `RETURNED` |  |
| `999` | `LOST_OR_DAMAGED` |  |

## SimCarrier Gamma (`gamma`)

10 estados · formato `json_es` · guías con prefijo `GAM`

| Estado propio | Estado canónico | Nota |
|---|---|---|
| `Generada` | `CREATED` |  |
| `Recolectada` | `PICKED_UP` |  |
| `En tránsito` | `IN_TRANSIT` |  |
| `En reparto` | `OUT_FOR_DELIVERY` |  |
| `Entregada` | `DELIVERED` |  |
| `Intento fallido` | `EXCEPTION` |  |
| `Novedad` | `EXCEPTION` |  |
| `Cancelada` | `EXCEPTION` | se usa para cancelaciones |
| `Devuelta al remitente` | `RETURNED` |  |
| `Perdida o dañada` | `LOST_OR_DAMAGED` |  |

## SimCarrier Delta (`delta`)

11 estados · formato `xml` · guías con prefijo `DEL`

| Estado propio | Estado canónico | Nota |
|---|---|---|
| `NEW` | `CREATED` |  |
| `PCK` | `PICKED_UP` |  |
| `TRN` | `IN_TRANSIT` |  |
| `HUB` | `IN_TRANSIT` |  |
| `OFD` | `OUT_FOR_DELIVERY` |  |
| `DLV` | `DELIVERED` |  |
| `NDL` | `EXCEPTION` |  |
| `HLD` | `EXCEPTION` |  |
| `CNL` | `EXCEPTION` | se usa para cancelaciones |
| `RTS` | `RETURNED` |  |
| `LST` | `LOST_OR_DAMAGED` |  |

## SimCarrier Epsilon (`epsilon`)

11 estados · formato `form` · guías con prefijo `EPS`

| Estado propio | Estado canónico | Nota |
|---|---|---|
| `Shipment registered` | `CREATED` |  |
| `Collected from sender` | `PICKED_UP` |  |
| `Departed origin facility` | `IN_TRANSIT` |  |
| `Arrived at destination facility` | `IN_TRANSIT` |  |
| `Out for delivery` | `OUT_FOR_DELIVERY` |  |
| `Delivered to recipient` | `DELIVERED` |  |
| `Delivery attempt unsuccessful` | `EXCEPTION` |  |
| `Held - address verification` | `EXCEPTION` |  |
| `Cancelled by shipper` | `EXCEPTION` | se usa para cancelaciones |
| `Returned to shipper` | `RETURNED` |  |
| `Lost or damaged in transit` | `LOST_OR_DAMAGED` |  |

## Ciclos de vida que se generan

| Peso | Recorrido |
|---|---|
| 55 | Creado → recolectado → en tránsito → en reparto → entregado |
| 15 | Igual, con dos eventos en tránsito |
| 10 | Novedad en el reparto y luego entregado |
| 6 | Novedad en tránsito y luego entregado |
| 6 | Novedad en el reparto y luego devuelto |
| 4 | Perdido o dañado en tránsito |
| 4 | Creado y luego cancelado |

Con esto, en una simulación larga se alcanzan **todos** los estados de cada catálogo.
