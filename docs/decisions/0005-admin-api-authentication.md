---
id: 0005-admin-api-authentication
title: "ADR-0005: Admin API authentication"
sidebar_position: 6
---

# ADR-0005: Shared admin token, closed by default

**Status:** Accepted · **Origin:** HU-12

## Context

The admin endpoints change business data. The system has no user accounts or identities yet.

## Decision

- Admin endpoints require the **`X-Admin-Token`** header, compared with `ADMIN_API_KEY`.
- **Fail closed:** if `ADMIN_API_KEY` is empty the endpoints answer `503`, never "open". A missing or wrong token answers `401`.
- The comparison is **constant-time**.
- **No JWT**, because without user identities it adds no value.

## Consequences

- Simple to operate and safe by default.
- One shared secret means no per-user audit trail. When users and roles exist, this decision must be revisited.
- The key must be generated per environment and never committed.

## Evidence

`backend/app/security.py`, `backend/app/config.py`.
