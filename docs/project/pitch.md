---
id: pitch
title: Pitch
sidebar_position: 2
---

# Pitch

:::note About this page
This pitch was written from the one-page summary of the project and the business goals. If the team has a presentation
version, it should replace or extend this page.
:::

## From scattered data to on-time decisions

Twelve carriers deliver for CargaExpress's brands. Each one speaks a different language: different status codes, different
formats, different timing. The result is late warnings, unclear blame and slow settlements.

**CargaExpress Control Tower** turns that noise into one clear picture.

### In three steps

1. **Receive and unify.** Every event, from every carrier, through a secure intake. Eight statuses instead of dozens. Nothing
   is ever lost, and the translation can be changed without redeploying.
2. **Calculate and decide.** The SLA is counted in business days. The system warns **24 hours before** a delay happens and says
   who owns it and why.
3. **Settle and notify.** Penalties are calculated automatically and passed on only to whoever caused the delay. The biweekly
   settlement is netted in **under 2 hours** instead of 4 days.

### What changes for each person

| For | Today | With the control tower |
|---|---|---|
| A brand | Calls to ask where an order is | Sees status, SLA and penalties itself |
| A carrier | Disputes penalties it cannot verify | Sees only the penalties it caused, with the events behind them |
| The control tower team | Finds delays after they happen | Gets at-risk orders with a likely cause |
| Finance | Spends 4 days settling | Reviews a net settlement in under 2 hours |
| Management | Has no single view | Reads one Power BI compliance dashboard |

### The promise

| 24 h | 100% | −30% | under 2 h |
|---|---|---|---|
| advance warning of SLA breaches | of carrier-attributable penalties passed on | brand complaints | biweekly settlement (today 4 days) |

### Why it is trustworthy

- **One source of truth:** raw events are stored unchanged and can be reprocessed.
- **Clear rules:** every business rule is traced to a component and to at least one automated test.
- **Private by design:** recipient personal data is isolated and never reaches the analytics layer.
- **Affordable:** the estimated infrastructure cost is about **USD 460 per month**. See [Costs](./costs.md).
