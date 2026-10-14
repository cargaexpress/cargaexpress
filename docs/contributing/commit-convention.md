---
id: commit-convention
title: Commit convention
sidebar_position: 1
---

# Commit convention

Project commits are written **in English**, using the *Conventional Commits* structure and following the
[best practices from midu.dev](https://midu.dev/buenas-practicas-escribir-commits-git/) (in Spanish). Each commit describes
**one** clear change and is made **file by file (or the smallest group of related files)**, never with `git add .`.

## Format

```text
type(optional scope): short description

Optional body: why the change was made and what context is needed.
```

- First line of **50 characters at most**, in the **imperative mood** and lowercase: `add`, `fix`, `change`, `remove`.
- No trailing period or ellipsis in the title.
- One blank line between the title and the body.
- Useful test: complete the sentence *"If applied, this commit will…"* (add a new search feature).
- If the message needs a lot of explanation, the commit does too many things: split it.

## Types

| Type | When to use it |
|---|---|
| `feat` | New functionality |
| `fix` | Bug fix |
| `perf` | Performance improvement |
| `build` | Dependencies, packaging, deployment |
| `ci` | Continuous integration and hooks |
| `docs` | Documentation |
| `refactor` | Reorganize code without changing behavior |
| `style` | Formatting or styles that do not change logic |
| `test` | Add or adjust tests |
| `chore` | Maintenance tasks |

## Examples

| ❌ Don't | ✅ Do |
|---|---|
| `HU-17` | `feat(simulator): add carrier status catalog` |
| `Added search feature.` | `feat: add search by category` |
| `Fix a problem...` | `fix: remove broken link in sidebar` |
| `update` | `docs: describe carrier payload formats` |

The user story number may go **at the end of the body or title as a reference** (`Refs HU-17`), but never as the only content
of the message.

## How to commit file by file

```bash
git add docs/simulator/statuses.md        # only that file
git commit -m "docs: add carrier status catalog"
```

To write a body, run `git commit` without `-m` and the editor will open.

## Automatic validation

The repository includes a `commit-msg` hook that rejects messages that do not follow the format. Enable it once per clone:

```bash
git config core.hooksPath .githooks
```

The hook checks: valid type, 50 characters at most, no trailing period, lowercase description, no past-tense or gerund verbs
(`added`, `fixing`…), that it is not just a story number, and the blank line before the body.

:::note What the hook cannot check
The hook cannot detect whether the message is in English or whether it describes the change well. That is checked by whoever
makes the commit and whoever reviews the pull request.
:::
