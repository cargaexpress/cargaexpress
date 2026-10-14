---
id: transportadoras-y-formatos
title: Transportadoras y formatos
sidebar_position: 2
---

# Transportadoras y formatos

Las 5 transportadoras Tipo A envían el mismo tipo de información, pero cada una con su **formato**, sus **nombres de campo**
y su manera de escribir la **hora**.

| Transportadora | Identificador | Formato | Content-Type | Hora |
|---|---|---|---|---|
| SimCarrier Alpha | `alpha` | JSON plano (snake_case) | `application/json` | ISO-8601 en UTC |
| SimCarrier Beta | `beta` | JSON anidado (camelCase) | `application/json` | Milisegundos desde 1970 |
| SimCarrier Gamma | `gamma` | JSON en español | `application/json; charset=utf-8` | ISO-8601 hora de Colombia (-05:00) |
| SimCarrier Delta | `delta` | XML | `application/xml` | `AAAAMMDDTHHMMSSZ` |
| SimCarrier Epsilon | `epsilon` | Formulario | `application/x-www-form-urlencoded` | Segundos desde 1970 |

## Ejemplos reales de mensajes

Generados por el simulador (datos simulados).

### Alpha

```json
{"event_id": "92edcf45-1a1a-4e87-8b33-e968617959ce", "tracking_number": "ALP8480918169", "status": "IN_TRANSIT", "occurred_at": "2026-10-13T03:21:00Z", "location": "Bogotá"}
```

### Beta

```json
{"eventId": "ef901b93-2a7c-4880-aa37-53915c76f18a", "shipment": {"trackingId": "BET5219466551"}, "event": {"code": "300", "occurredAtEpochMs": 1791867840000}, "hub": "Cartagena"}
```

### Gamma

```json
{"id_evento": "f486ab73-9fab-4827-ae50-bd4eb52fa53c", "guia": "GAM2356321087", "estado": "En tránsito", "fecha": "2026-10-13T01:28:00-05:00", "ciudad": "Medellín"}
```

### Delta

```xml
<?xml version='1.0' encoding='utf-8'?>
<ShipmentEvent id="14b9adb5-0c6d-4a3d-b85a-5cd22959fea3"><Tracking>DEL7918451614</Tracking><Status>HUB</Status><Timestamp>20261013T030200Z</Timestamp><Location>Bogotá</Location></ShipmentEvent>
```

### Epsilon

```text
evt=85ae8770-f9db-41db-ab56-955dda2d3b3d&awb=EPS1889315464&state=Arrived+at+destination+facility&ts=1791856140&city=C%C3%BAcuta
```

## Qué trae cada mensaje

Los cinco formatos llevan la misma información de fondo:

| Dato | Para qué sirve |
|---|---|
| Identificador del evento | Permite detectar duplicados: un reenvío trae el **mismo** identificador |
| Número de guía | Une todos los eventos de un mismo envío |
| Estado propio de la transportadora | Se traduce al estado canónico con el mapeo de estados |
| Fecha y hora del evento | Permite ordenar eventos que llegan desordenados |
| Ciudad o centro | Lugar del evento |
