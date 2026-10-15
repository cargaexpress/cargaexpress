---
id: canonical-states
title: Canonical states (US-02)
sidebar_position: 3
---

# Canonical state catalog

**Story:** `US-02` · RIWI-12 · *Design the Canonical State Catalog* · Owner: Julian Vanegas · Subtasks: RIWI-13, RIWI-14,
RIWI-15 · Traceability: RN-01, RN-02, E-15, CA-01, CA-05, CA-06

Every carrier names its statuses differently. The control tower translates all of them into **8 canonical states** so that
the whole system speaks one language. This page defines the states, the valid transitions, the mapping table and the rule
that protects final states.

## The 8 states

| Business name | Meaning | Type | Name in code |
|---|---|---|---|
| `CREADO` | Created: the order or guide exists in the WMS and has not been picked up | Initial | `CREATED` |
| `RECOGIDO` | Picked up: the carrier received the package at the distribution center (equals dispatch) | Active | `PICKED_UP` |
| `EN_TRANSITO` | In transit: moving between the carrier's nodes | Active | `IN_TRANSIT` |
| `EN_REPARTO` | Out for delivery: on the last-mile route to the recipient | Active | `OUT_FOR_DELIVERY` |
| `NOVEDAD` | Issue: wrong address, customer absent, held at a carrier depot | Active (exception) | `EXCEPTION` |
| `ENTREGADO` | Delivered: received by the recipient | **Final** | `DELIVERED` |
| `DEVUELTO` | Returned: sent back to the sender | **Final** | `RETURNED` |
| `SINIESTRO` | Lost or damaged | **Final** | `LOST_OR_DAMAGED` |

:::warning Two vocabularies for the same states
The design documents (RN-01, this story and the data models) use the **business names** in the first column. The backend
implemented in sprint 2 stores the **code names** in the last column. They are the same 8 states, one to one. The team should
decide which vocabulary is the official one and use it everywhere.
:::

## State diagram

```mermaid
flowchart LR
    CREADO([CREADO<br/>Created]):::initial
    RECOGIDO[RECOGIDO<br/>Picked up]:::active
    TRANSITO[EN_TRANSITO<br/>In transit]:::active
    REPARTO[EN_REPARTO<br/>Out for delivery]:::active
    NOVEDAD{{NOVEDAD<br/>Issue}}:::issue
    ENTREGADO[[ENTREGADO<br/>Delivered]]:::final
    DEVUELTO[[DEVUELTO<br/>Returned]]:::final
    SINIESTRO[[SINIESTRO<br/>Lost or damaged]]:::final

    CREADO --> RECOGIDO --> TRANSITO --> REPARTO --> ENTREGADO
    TRANSITO -- "new node" --> TRANSITO
    REPARTO -- "re-routing" --> TRANSITO

    CREADO -. issue .-> NOVEDAD
    RECOGIDO -. issue .-> NOVEDAD
    TRANSITO -. issue .-> NOVEDAD
    REPARTO -. issue .-> NOVEDAD
    NOVEDAD -- resolved --> TRANSITO
    NOVEDAD -- resolved --> REPARTO
    NOVEDAD -- "delivered anyway" --> ENTREGADO

    RECOGIDO & TRANSITO & REPARTO & NOVEDAD --> DEVUELTO
    CREADO & RECOGIDO & TRANSITO & REPARTO & NOVEDAD --> SINIESTRO

    classDef initial fill:#e6f4ea,stroke:#1e7a3c,color:#111
    classDef active fill:#e8f0fe,stroke:#2b59c3,color:#111
    classDef issue fill:#fff4d6,stroke:#b07800,color:#111
    classDef final fill:#fde7e7,stroke:#b3261e,color:#111,stroke-width:3px
```

**How to read it.** Follow the solid line across the top for the normal path: created, picked up, in transit, out for
delivery, delivered. The dotted lines are the *issue* loop: any active state can raise a `NOVEDAD`, which later returns to
transit or delivery, or ends in a final state. Red double-border boxes are **final states**: no arrow leaves them. A guide can
end as returned or lost from the states shown; the exact pairs are in the matrix below (for example `CREADO` cannot go
straight to `DEVUELTO`).

## Valid transitions

Row is the current state, column is the new state. ✔ is valid. ✘ is invalid and is recorded as an anomaly. A dash is the same
state.

| From \ To | `CREADO` | `RECOGIDO` | `EN_TRANSITO` | `EN_REPARTO` | `NOVEDAD` | `ENTREGADO` | `DEVUELTO` | `SINIESTRO` |
|---|---|---|---|---|---|---|---|---|
| **`CREADO`** | – | ✔ | ✘ | ✘ | ✔ | ✘ | ✘ | ✔ |
| **`RECOGIDO`** | ✘ | – | ✔ | ✘ | ✔ | ✘ | ✔ | ✔ |
| **`EN_TRANSITO`** | ✘ | ✘ | ✔ repeated | ✔ | ✔ | ✘ | ✔ | ✔ |
| **`EN_REPARTO`** | ✘ | ✘ | ✔ re-routing | – | ✔ | ✔ | ✔ | ✔ |
| **`NOVEDAD`** | ✘ | ✘ | ✔ | ✔ | – | ✔ | ✔ | ✔ |
| **`ENTREGADO`** | ✘ | ✘ | ✘ | ✘ | ✘ | – | ✘ | ✘ |
| **`DEVUELTO`** | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | – | ✘ |
| **`SINIESTRO`** | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | ✘ | – |

## Why the rules are the way they are

| Rule | Reason |
|---|---|
| **Final states have no outgoing transitions** (RN-02) | `ENTREGADO`, `DEVUELTO` and `SINIESTRO` close the life of a guide. Delivery, SLA and penalties are calculated from them, so a late or wrong event must not reopen the guide |
| **`EN_TRANSITO` → `EN_TRANSITO` is valid** | A package moves through several carrier nodes. Each new node is a legitimate progress event, not an error, so it creates no anomaly |
| **`EN_REPARTO` → `EN_TRANSITO` is valid** (re-routing) | A package out for delivery can go back into the carrier's network to be routed again |
| **A repeated event with identical content is discarded** (CA-05) | The same message arriving twice is a retry, not a transition. It is dropped for idempotency and creates no anomaly |
| **An older event does not roll the state back** | An event dated before the current state is kept in the history and flagged `FUERA_DE_ORDEN` (out of order). The state does not move backwards |
| **An invalid transition does not change the state** | The event is still stored, so nothing is lost, and it is flagged `TRANSICION_INVALIDA` for review |
| **An unmapped carrier code does not block the flow** | The event is stored as `SIN_MAPEO` (unmapped) and the operator is alerted. New codes are detected without losing data |

## Mapping table

The mapping lives in the database, so changing it needs no redeployment (CA-06). A change closes the current row and inserts a
new version, which keeps the full history and allows rollback.

```sql
CREATE TYPE estado_canonico AS ENUM (
  'CREADO','RECOGIDO','EN_TRANSITO','EN_REPARTO',
  'NOVEDAD','ENTREGADO','DEVUELTO','SINIESTRO');

CREATE TABLE mapeo_estado (
  id                SERIAL PRIMARY KEY,
  transportadora_id INT NOT NULL REFERENCES transportadora(id),
  codigo_externo    VARCHAR(60) NOT NULL,
  estado_canonico   estado_canonico NOT NULL,
  version           INT NOT NULL,
  vigente_desde     TIMESTAMPTZ NOT NULL DEFAULT now(),
  vigente_hasta     TIMESTAMPTZ,            -- NULL = current
  creado_por        VARCHAR(80) NOT NULL,
  motivo_cambio     TEXT,
  UNIQUE (transportadora_id, codigo_externo, version)
);
```

A unique index on `(transportadora_id, codigo_externo)` where `vigente_hasta IS NULL` guarantees one current translation per
carrier code. A second table, `transicion_valida (desde, hacia)`, holds the valid pairs of the matrix.

### Example

Several external codes of the same carrier can converge into one canonical state. That is the "14 codes for delivered"
problem.

| Carrier | Mode | External code | Canonical state |
|---|---|---|---|
| TRANS-A1 | A (webhook) | `PICKED_UP` | `RECOGIDO` |
| TRANS-A1 | A | `IN_TRANSIT` | `EN_TRANSITO` |
| TRANS-A1 | A | `OUT_FOR_DELIVERY` | `EN_REPARTO` |
| TRANS-A1 | A | `DELIVERED` | `ENTREGADO` |
| TRANS-A1 | A | `ADDRESS_ISSUE` | `NOVEDAD` |
| TRANS-A1 | A | `LOST` | `SINIESTRO` |
| TRANS-B1 | B (API) | `10` | `RECOGIDO` |
| TRANS-B1 | B | `20` | `EN_TRANSITO` |
| TRANS-B1 | B | `30` | `EN_REPARTO` |
| TRANS-B1 | B | `40` / `41` | `ENTREGADO` |
| TRANS-B1 | B | `50` | `NOVEDAD` |
| TRANS-B1 | B | `60` | `DEVUELTO` |
| TRANS-C1 | C (file) | `Recolectado` | `RECOGIDO` |
| TRANS-C1 | C | `En ruta` | `EN_TRANSITO` |
| TRANS-C1 | C | `En distribución` | `EN_REPARTO` |
| TRANS-C1 | C | `Entregado` / `Recibido conforme` | `ENTREGADO` |
| TRANS-C1 | C | `Cliente ausente` | `NOVEDAD` |
| TRANS-C1 | C | `Retenido en bodega` | `NOVEDAD` |
| TRANS-C1 | C | `Devolución a origen` | `DEVUELTO` |

External codes are shown exactly as the carrier sends them, so some are in Spanish. Deliverable E-15 completes the 12 carriers,
each with at least 6 proprietary states.

## Decision algorithm for an incoming event (RN-02)

```mermaid
flowchart TD
    A[Event arrives] --> B{Same content hash<br/>already seen?}
    B -- yes --> B1[Discard<br/>idempotency, CA-05]
    B -- no --> C{Mapping exists<br/>for the external code?}
    C -- no --> C1[Store as SIN_MAPEO<br/>alert the operator]
    C -- yes --> D[Store the event<br/>always, for traceability]
    D --> E{Current state is final<br/>and the new one differs?}
    E -- yes --> E1[Anomaly TRANSICION_DESDE_FINAL<br/>state unchanged]
    E -- no --> F{Pair is in<br/>valid transitions?}
    F -- no --> F1[Anomaly TRANSICION_INVALIDA<br/>state unchanged]
    F -- yes --> G{Event time is before<br/>the last applied one?}
    G -- yes --> G1[Anomaly FUERA_DE_ORDEN<br/>state unchanged]
    G -- no --> H[Update state and timestamp]
```

Anomalies are stored in `anomalia_evento` with the event, the guide, the carrier, the current and received states and the
detection time. The types are `TRANSICION_DESDE_FINAL`, `TRANSICION_INVALIDA`, `FUERA_DE_ORDEN`, `SIN_MAPEO` and
`GUIA_INEXISTENTE`. Anomalies per carrier feed the dashboard question *Which carriers have the most event anomalies?*

### Test cases

| Given | When | Then |
|---|---|---|
| Guide is `ENTREGADO` (CA-01) | An "in transit" event arrives | State stays `ENTREGADO`, event is stored, anomaly `TRANSICION_DESDE_FINAL` |
| Guide is `DEVUELTO` | An `ENTREGADO` event arrives | State stays `DEVUELTO`, anomaly `TRANSICION_DESDE_FINAL` |
| Guide is `SINIESTRO` | An `EN_REPARTO` event arrives | State stays `SINIESTRO`, anomaly `TRANSICION_DESDE_FINAL` |
| Guide is `ENTREGADO` | The same event is repeated (CA-05) | Discarded for idempotency, no anomaly |
| The external code has no mapping | An event with a new code arrives | Stored as `SIN_MAPEO` and the operator is alerted |

## Acceptance criteria status

| Criterion | Status in the document |
|---|---|
| Mapping table designed and approved | Designed (DDL and examples). **Pending** approval by the team in peer review |
| Transition rules and final states documented | Complete: matrix, algorithm, RN-02 and test cases |
| Validated diagram of the 8 states | Created in draw.io. **Pending** validation by a second team member |

### Review feedback received

The story received review feedback on 28 September. It asked for the deliverable to be corrected before it counts as
complete:

1. Redesign the state diagram so it is clear and easy to read, with a visible difference between initial, intermediate,
   exception and final states.
2. Explain why the main transitions are valid or invalid, and connect that to the diagram.
3. Write the whole document in English, with terminology consistent with the application.
4. Validate the mapping table and get the diagram validated by a second team member.

This page responds to the first three points: the diagram is redrawn above, the reasons are in
[Why the rules are the way they are](#why-the-rules-are-the-way-they-are), and the page is in English. The two validations
still need people to sign off.

## Related

- [Business rules](./business-rules.md) · RN-01 and RN-02
- [Data model](./data-model.md) · `carrier_status_map`, `tracking_event` and the anomaly flag
- [ADR-0003](../decisions/0003-canonical-statuses-and-state-mapping.md)
