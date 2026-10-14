---
id: api-reference
title: API reference
sidebar_position: 3
---

# API reference

Interactive documentation is served by the backend itself at `http://localhost:8000/docs`. This page summarizes what exists.
Route names follow the code as committed; some are in Spanish (`pedidos`, `mapeo-estados`).

## Public endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/health` | Service and database check. Returns `{"status":"ok","database":"up"}` |
| `POST` | `/api/v1/pedidos` | Create an order with its lines and recipient (HU-13) |
| `GET` | `/api/v1/pedidos/{order_id}` | Get an order by ID |
| `GET` | `/api/v1/pedidos?skip=0&limit=50` | List orders with pagination |
| `PATCH` | `/api/v1/pedidos/{order_id}/status` | Update an order's status |

Creating an order checks that the brand, the distribution center and the shipment type exist; otherwise it answers `404`.
The status update is direct: business rule RN-02 (no moving backwards from a terminal status, and recording anomalies) is
**not implemented yet**.

## Admin endpoints

All admin endpoints require the `X-Admin-Token` header.

| Answer | When |
|---|---|
| `503` | `ADMIN_API_KEY` is not configured. Admin endpoints are closed by default |
| `401` | The header is missing or wrong |

### Status mapping (HU-12)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/admin/state-mappings?carrier_id=` | List mappings |
| `GET` | `/api/v1/admin/state-mappings/resolve?carrier_id=&raw_status=` | Translate a received status. `404` when there is no mapping |
| `POST` | `/api/v1/admin/state-mappings` | Create a mapping |
| `PATCH` | `/api/v1/admin/state-mappings/{id}` | Change a mapping |
| `DELETE` | `/api/v1/admin/state-mappings/{id}` | Delete a mapping |

### Status mapping per carrier (HU-15)

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/v1/admin/mapeo-estados/{transportadora_id}` | Get the whole mapping of one carrier |
| `PUT` | `/api/v1/admin/mapeo-estados/{transportadora_id}` | Replace the whole mapping of one carrier |

:::warning Not reachable yet
The HU-15 router exists in `backend/app/routers/admin_mapeo_estados.py`, but it is **not registered** in `app/main.py`, so
these two routes are not served by the running application. See [Project status](../project/status.md).
:::
