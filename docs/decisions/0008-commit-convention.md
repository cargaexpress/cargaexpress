---
id: 0008-commit-convention
title: "ADR-0008: Commit convention"
sidebar_position: 9
---

# ADR-0008: Conventional, per-file commits in English

**Status:** Accepted

## Context

Commit messages that only carry a user story number say nothing about the change, which makes review and history hard.

## Decision

- Commits are written **in English** using the *Conventional Commits* structure, following the midu.dev best practices.
- The title is at most 50 characters, imperative and lowercase, with no trailing period.
- Each commit describes **one change** and is made **file by file**, never with `git add .`.
- A story number may appear only as a reference, never as the whole message.
- A `commit-msg` hook validates the format.

## Consequences

- A readable history and easier reviews.
- The hook cannot check the language or the quality of the description; reviewers do.

## Evidence

[Commit convention](../contributing/commit-convention.md), `.githooks/commit-msg`.
