---
id: 0012-utc-and-business-calendars
title: "ADR-0012: UTC and business calendars"
sidebar_position: 13
---

# ADR-0012: Store everything in UTC, apply calendar and cut-off by country

**Status:** Proposed in the architecture design · **Origin:** US-03, US-04, RN-03

## Context

Orders are dispatched from distribution centers in one country and delivered in another. The SLA is counted in business days,
with a 16:00 cut-off, excluding Sundays and public holidays of the **destination** country.

## Decision

- All timestamps are stored in **UTC** (`timestamptz`).
- The **16:00 cut-off** and the **holidays** are applied using the time zone of the distribution center and the calendar of the
  destination country.
- A `calendar_day` table stores, per country and date, whether the day is a business day, a holiday and the cut-off time.
- If the distribution center and the destination are in different countries, the clock uses the **destination calendar**.

## Consequences

- Results do not depend on the server's time zone.
- Holiday data must be maintained for every country served. The project loads it from Nager.Date for 3 countries.
- The worked example (Friday 17:00 dispatch, Monday holiday, deadline on Wednesday) becomes a test. See
  [SLA and delay](../sprint-1/sla-and-delay.md).

## Evidence

[Data model](../sprint-1/data-model.md), [Business rules](../sprint-1/business-rules.md) (RN-03).
