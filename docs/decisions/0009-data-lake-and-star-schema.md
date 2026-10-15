---
id: 0009-data-lake-and-star-schema
title: "ADR-0009: Data lake and star schema"
sidebar_position: 12
---

# ADR-0009: A layered data lake and a star schema for analytics

**Status:** Proposed in the architecture design · **Origin:** US-03, US-04

## Context

Management, finance and the control tower need history and trends, and brands must never see personal data in reports. The
operational database should not carry heavy analytical queries.

## Decision

- The **S3 data lake** has four layers: **Landing** (files as received), **Bronze** (raw, unchanged), **Silver** (clean and
  normalized) and **Gold** (dimensional model). Data is stored as Parquet, partitioned by date.
- **Gold contains no personal data.**
- Analytics use a **star schema**, not a snowflake: flat dimensions that are simple for Power BI. The carrier dimension keeps
  its history (slowly changing dimension type 2).
- Queries run through **Athena**, and Power BI reads from it.
- The grain of the main fact table is **one row per guide**.

## Consequences

- Pay-per-query analytics with no always-on warehouse.
- Dashboards stay simple, and history of carrier changes is kept.
- Spark ETL must keep Silver and Gold up to date, and must handle the generation of global keys.

## Evidence

[Data model](../sprint-1/data-model.md) (star schema), [Architecture v1](../sprint-1/architecture-v1.md).
