---
id: business-rules
title: Business rules (US-01)
sidebar_position: 2
---

# Business rules and technical specification

**Story:** `US-01` · RIWI-11 · *Translate Business Rules into Technical Specifications* · Owner: Helda Reyes · Epic:
Business Understanding and Rules Alignment

The business rules of the project (RN-01 to RN-10) were translated into technical specifications so that every member of the
team reads the same rule the same way. Each rule has a technical description, a component that implements it, a functional
requirement, an acceptance criterion and a test scenario. The source is the *Technical Specification and Traceability Matrix
for Business Rules* (29 September 2026).

:::note Names used in the rules
State names such as `CREADO` or `ENTREGADO` are the fixed business identifiers of RN-01. Their English meaning and the names
used in code are in [Canonical states](./canonical-states.md).
:::

## The ten rules at a glance

| Rule | Topic | In plain words |
|---|---|---|
| [RN-01](#rn-01--state-normalization) | State normalization | Every carrier status maps to one of 8 canonical states, and the mapping can change without a deployment |
| [RN-02](#rn-02--final-states) | Final states | A delivered, returned or lost order never goes back to an active state |
| [RN-03](#rn-03--sla-calculation) | SLA calculation | The SLA counts business days from dispatch, skipping Sundays and destination holidays |
| [RN-04](#rn-04--non-compliance-risk) | Non-compliance risk | An order is at risk close to its deadline or when an issue stays open too long |
| [RN-05](#rn-05--responsibility-assignment) | Responsibility | The distribution center, the carrier or the brand is assigned each delay |
| [RN-06](#rn-06--penalties) | Penalties | The brand receives a percentage of the freight; the carrier pays only when responsible |
| [RN-07](#rn-07--orders-with-several-guides) | Several guides | An order meets the SLA only if all of its guides do |
| [RN-08](#rn-08--biweekly-settlement) | Settlement | Penalties are settled every half-month and netted |
| [RN-09](#rn-09--carrier-status) | Carrier status | A carrier below 85% for two half-months goes under review |
| [RN-10](#rn-10--personal-data) | Personal data | Only the brand that owns an order can see its recipient's data |

## RN-01 · State normalization

**Rule.** All carrier states must be mapped to the canonical catalog: `CREADO`, `RECOGIDO`, `EN_TRANSITO`, `EN_REPARTO`,
`NOVEDAD`, `ENTREGADO`, `DEVUELTO` and `SINIESTRO`.

**Specification.** A configuration maps each carrier's source state to a canonical state, with the carrier, the source state,
the canonical state, a configuration status and a version or validity period. Changing the mapping must not require a new
deployment.

| | |
|---|---|
| Component | Event normalization module and configurable state catalog |
| Requirement | RF-02 |
| Acceptance | CA-06: a change in a carrier's mapping applies without redeployment |
| Test | `TEST-RN01`: a carrier-specific state is converted to the configured canonical state |

## RN-02 · Final states

**Rule.** A final state (`ENTREGADO`, `DEVUELTO` or `SINIESTRO`) can never be replaced by a non-final state. The late events
are recorded as anomalies.

**Specification.** If an order is already in a final state and a later event is non-final, the system keeps the final state,
stores the new event, flags it as an anomaly and does not let it change the order.

| | |
|---|---|
| Component | Event processor and state transition validator |
| Requirement | RF-02 |
| Acceptance | CA-01: an `EN_TRANSITO` event after `ENTREGADO` does not change the state and is recorded as an anomaly |
| Test | `TEST-RN02` |

## RN-03 · SLA calculation

**Rule.** The SLA is measured in business days from the dispatch date of the distribution center until delivery. Sundays and
public holidays of the destination country are excluded. Orders dispatched after 16:00 start counting on the next business day.

| | |
|---|---|
| Component | SLA calculation service and business-day calendar service |
| Requirement | RF-03 |
| Acceptance | CA-02: dispatched on Friday at 17:00 with a 2-business-day SLA and a holiday on Monday, the deadline is **Wednesday** |
| Test | `TEST-RN03` |

The worked example is in [SLA and delay](./sla-and-delay.md).

## RN-04 · Non-compliance risk

**Rule.** An order is at risk when 24 business hours or less remain until the deadline and it is not `EN_REPARTO`, or when it
has an open `NOVEDAD` for more than 12 hours.

**Specification.** The system periodically evaluates orders that have not reached a final state, marks them `EN_RIESGO`, and
stores the reason.

| | |
|---|---|
| Component | SLA risk evaluation service |
| Requirement | RF-03 |
| Acceptance | Pending: no specific criterion is defined |
| Test | `TEST-RN04` |

## RN-05 · Responsibility assignment

**Rule.** Responsibility follows the stage and the cause of the delay.

| Situation | Responsible |
|---|---|
| Delay between creation and dispatch | Distribution center (`CD`) |
| Delay between dispatch and delivery | Carrier (`TRANSPORTADORA`) |
| `NOVEDAD` caused by a wrong address | Brand (`MARCA`) |

| | |
|---|---|
| Component | Responsibility assignment service |
| Requirement | RF-04 |
| Acceptance | CA-04: a delay caused by a wrong address is not passed on to the carrier |
| Test | `TEST-RN05` |

## RN-06 · Penalties

**Rule.** The penalty in favor of the brand is a percentage of the freight value, depending on the days of delay.
CargaExpress passes the penalty to the carrier only when the carrier is responsible.

**Specification.** Penalty percentages come from the penalty configuration (source F7). A carrier penalty transfer is created
only when the responsible party is the carrier.

| | |
|---|---|
| Component | Penalty calculation engine and penalty transfer module |
| Requirement | RF-04 |
| Acceptance | Pending: no specific criterion is defined |
| Test | `TEST-RN06`: three orders with the same delay but different responsible parties; only the carrier case creates a transfer |

## RN-07 · Orders with several guides

**Rule.** An order split into several guides meets the SLA only if **all** guides are delivered within the deadline.

| | |
|---|---|
| Component | Order and guide SLA evaluation service |
| Requirement | RF-03 |
| Acceptance | CA-03: two guides, one on time and one late, means the order does not meet the SLA |
| Test | `TEST-RN07` |

## RN-08 · Biweekly settlement

**Rule.** Penalties are settled by calendar half-month and netted between penalties to pay to brands and penalties to collect
from carriers.

**Specification.** Net amount = penalties to be paid to brands − penalties to be collected from carriers. The settlement can be
consulted by period, brand, carrier and order, with the penalty, transferred and net amounts.

| | |
|---|---|
| Component | Biweekly settlement batch process |
| Requirement | RF-05 |
| Acceptance | CA-09: the settlement balances according to the netting |
| Test | `TEST-RN08` |

## RN-09 · Carrier status

**Rule.** A carrier with compliance below 85% in two consecutive half-months changes to `EN_REVISIÓN` and does not receive new
shipments from premium brands.

**Specification.** At the end of each half-month, compliance = compliant orders ÷ evaluated orders × 100.

| | |
|---|---|
| Component | Carrier performance evaluator and shipment assignment module |
| Requirement | RF-08 |
| Acceptance | CA-08: 80% in two consecutive half-months changes the carrier to `EN_REVISIÓN` |
| Test | `TEST-RN09` |

## RN-10 · Personal data

**Rule.** Recipient personal data can only be accessed by the brand that owns the order.

**Specification.** The API validates the identity of the requesting brand before returning personal data, and a brand cannot
see data from another brand's orders.

| | |
|---|---|
| Component | Brand API, authentication, authorization and data access control |
| Requirement | RF-06 |
| Acceptance | CA-10: a brand cannot view orders or personal data of another brand |
| Test | `TEST-RN10` |

## Traceability

| Rule | Component | Requirement | Acceptance | Test |
|---|---|---|---|---|
| RN-01 | Event normalizer, state catalog | RF-02 | CA-06 | `TEST-RN01` |
| RN-02 | State transition validator | RF-02 | CA-01 | `TEST-RN02` |
| RN-03 | SLA service, holiday calendar | RF-03 | CA-02 | `TEST-RN03` |
| RN-04 | Risk evaluation service | RF-03 | Pending | `TEST-RN04` |
| RN-05 | Responsibility service | RF-04 | CA-04 | `TEST-RN05` |
| RN-06 | Penalty engine | RF-04 | Pending | `TEST-RN06` |
| RN-07 | Order SLA evaluation | RF-03 | CA-03 | `TEST-RN07` |
| RN-08 | Settlement batch | RF-05 | CA-09 | `TEST-RN08` |
| RN-09 | Carrier performance evaluator | RF-08 | CA-08 | `TEST-RN09` |
| RN-10 | Brand API and authorization | RF-06 | CA-10 | `TEST-RN10` |

| Functional requirement | Rules |
|---|---|
| RF-02 Normalize states | RN-01, RN-02 |
| RF-03 Calculate SLA and risk | RN-03, RN-04, RN-07 |
| RF-04 Responsibility and penalties | RN-05, RN-06 |
| RF-05 Biweekly settlement | RN-08 |
| RF-06 Brand API | RN-10 |
| RF-08 Carrier status | RN-09 |

## Open ambiguities

These were identified in the specification and need a team decision before the affected rule is built. For each decision the
team should record the question, the options, the choice, the reason, the date, the owner and the technical impact, and write
an ADR when it applies.

| ID | Rule | Question | Status |
|---|---|---|---|
| AMB-01 | RN-01 | What happens when a carrier state has no mapping? Is it an anomaly, and does the canonical state stay unchanged? | Pending in the specification. The US-02 design proposes storing the event as `SIN_MAPEO` with an operator alert, while the implemented API answers `404`. |
| AMB-02 | RN-04 | What exactly are "24 business hours"? Which calendar and working schedule? | Pending |
| AMB-03 | RN-06 | Which fields choose the penalty from F7: brand, shipping type, region and delay days? | Pending |
| AMB-04 | RN-09 | What condition lets a carrier leave `EN_REVISIÓN`? | Pending |
| AMB-05 | RN-10 | Which fields are personal data, to be protected and kept out of the analytics layer? | Pending |

:::note
The acceptance criterion of `US-01` asks for all ambiguities to be resolved and the documentation to be approved by the team.
The decisions above are still open in the documents available, so they are listed as pending here.
:::
