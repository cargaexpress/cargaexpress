---
id: 0006-independent-webhook-simulator
title: "ADR-0006: Independent webhook simulator"
sidebar_position: 7
---

# ADR-0006: The webhook simulator is an independent service

**Status:** Accepted · **Origin:** HU-17

## Context

The ingestion of carrier events needs realistic test traffic: several formats, varied statuses, duplicates and events out of
order. The backend does not have an ingestion endpoint yet, and each team member needs to run their own simulator.

## Decision

- The simulator is a **separate repository, image and dependency set**, not part of the backend.
- It covers **5 Type A carriers** in 5 formats: flat JSON, nested JSON, Spanish-language JSON, XML and form data.
- It supports **push** (HTTP to a configurable URL per carrier) and **publishing to S3** so data can be read with `GET`.
- Duplicates and out-of-order delivery are **configurable and reproducible** with a seed.
- It is built on the standard library; `boto3` is an optional extra only for S3.

## Consequences

- The backend stays free of test-traffic code.
- The target URL is configurable and defaults to a bundled test receiver until the real endpoint exists.
- Delta and Epsilon are new simulated carriers with no mapping in the backend database yet.
- "Type A" is taken as the working definition of the 5 carriers; the team should confirm it.

## Evidence

[Webhook simulator](../simulator/overview.md) pages and the [HU-17 compliance](../simulator/hu-17-compliance.md) page.
