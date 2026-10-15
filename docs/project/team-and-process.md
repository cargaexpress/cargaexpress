---
id: team-and-process
title: Team and way of working
sidebar_position: 4
---

# Team and way of working

## Project

| | |
|---|---|
| Project | Project 09 · CargaExpress Supply Chain |
| Team | RIWI development team |
| Length | A 6-week project, organized in sprints |
| Work tracking | Jira project **RIWI** |
| Code | GitHub organization `cargaexpress` |

## People

Work in Jira is spread across three team members. The counts include stories, tasks and subtasks.

| Person | Sprint 1 | Sprint 2 · week 1 | Sprint 2 · week 2 |
|---|---|---|---|
| Alexandra Peña Orozco | 18 | 10 | n/a |
| Julian Vanegas | 8 | 4 | 9 |
| Helda Reyes | 9 | n/a | 6 |

Some work items carry over from week 1 to week 2 of sprint 2; they are counted in the week where they ended.

## How Jira is organized

| Level | Meaning | Example |
|---|---|---|
| **Epic** | A theme that groups stories | `RIWI-9` Business Understanding and Rules Alignment |
| **User story** | A need written as *As a… I want… so that…* with acceptance criteria. Sprint 1 stories are `US-01` to `US-09`; sprint 2 stories are `HU-11` onward | `RIWI-12` US-02 Design the Canonical State Catalog |
| **Subtask** | The concrete work inside a story | `RIWI-13` Define the 8 canonical states and valid transitions |

The full list is in [User stories](./user-stories.md), grouped by epic and sprint.

## Sprints

| Sprint | Observed dates | Stories | Focus |
|---|---|---|---|
| [Sprint 1](../sprint-1/index.md) | 25 Sep to 6 Oct 2026 | `US-01` to `US-09` | Understand the business, design the system, set up the foundations |
| [Sprint 2 · week 1](../sprint-2/week-1.md) | 6 to 8 Oct 2026 | `HU-11`, `HU-12`, `HU-13` | Persist the model and expose the first endpoints |
| [Sprint 2 · week 2](../sprint-2/week-2.md) | 6 to 13 Oct 2026 | `HU-14`, `HU-15`, `HU-16`, `HU-17`, `HU-19` | Complete the API and build the simulators |

:::note About the dates
Jira does not export the official start and end of each sprint. The dates above are taken from when the work items were
created and resolved.
:::

## Source control

| Practice | Detail |
|---|---|
| Branches | `main`, `develop` and `feature-*` branches, defined in `US-08`. Work for each story is done on a branch named after its Jira key, for example `feature/RIWI-68` |
| Pull requests | A pull request template was planned in `US-08`. See [Project status](./status.md) for whether it exists on `main` |
| Commits | English, structured and file by file. The rules are in the repository README |
| Review | Changes reach `main` through pull requests |

## Documentation practice

- The architecture document and the decision records are maintained as part of `US-09`. See [Decision records](../decisions/index.md).
- This site is the single place for project documentation, written in English.
- Every business rule is traced to a component and to at least one automated test. See [Business rules](../sprint-1/business-rules.md).

## Tools

| Need | Tool |
|---|---|
| Planning and backlog | Jira |
| Code and reviews | GitHub |
| Diagrams | draw.io, Mermaid in this site |
| Local environment | Docker and Docker Compose |
| Documentation | Docusaurus on GitHub Pages |
