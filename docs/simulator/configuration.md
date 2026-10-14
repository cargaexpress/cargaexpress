---
id: configuration
title: Configuration
sidebar_position: 4
---

# Configuration

Everything is configured with `SIM_*` **environment variables** or **command-line options**. If both exist, the
command-line option wins.

| Variable | Option | Default | What it does |
|---|---|---|---|
| `SIM_TARGET_URL_TEMPLATE` | `--target-url-template` | `http://localhost:9000/webhooks/{carrier}` | Target; `{carrier}` is replaced with `alpha`, `beta`, `gamma`, `delta` or `epsilon` |
| `SIM_CARRIERS` | `--carriers` | all 5 | Carriers to simulate, separated by commas |
| `SIM_RATE` | `--rate` | `5` | Messages per second (0 = no pauses) |
| `SIM_SHIPMENTS_PER_BATCH` | `--shipments-per-batch` | `20` | Shipments generated and shuffled in each batch |
| `SIM_MAX_EVENTS` | `--max-events` | `0` | Stop after N messages (0 = no limit) |
| `SIM_DUPLICATE_RATE` | `--duplicate-rate` | `0.10` | Probability (0 to 1) of resending an identical event |
| `SIM_OUT_OF_ORDER_RATE` | `--out-of-order-rate` | `0.10` | Probability (0 to 1) that an event arrives after a later event of its shipment |
| `SIM_DUPLICATE_MAX_DELAY` | `--duplicate-max-delay` | `5` | A duplicate arrives at most N messages after the original |
| `SIM_SEED` | `--seed` | random | Repeats exactly the same simulation |
| `SIM_DRY_RUN` | `--dry-run` / `--no-dry-run` | `false` | Prints the messages (one JSON per line) without sending them |
| `SIM_REQUEST_TIMEOUT` | `--timeout` | `5` | Maximum seconds to wait for each send |

## Validation

Invalid values stop the program with a clear message: rates outside 0 to 1, unknown carriers, a URL without `{carrier}`, a
negative `rate`, batches of fewer than 1 shipment, or a `timeout` less than or equal to 0.

## Summary and exit code

When it finishes (or when you stop it with Ctrl+C or `docker stop`) it prints a summary: sent, delivered (2xx responses),
failed, unique, duplicates and out of order. With `--max-events` and no successful delivery, it exits with **code 1**.

## Examples

```bash
# 200 messages, always the same simulation
python -m webhook_simulator --max-events 200 --seed 1

# Only Delta and Epsilon, with many duplicates
python -m webhook_simulator --carriers delta,epsilon --duplicate-rate 0.5

# See the messages without sending anything
python -m webhook_simulator --dry-run --max-events 10
```
