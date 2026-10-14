---
id: overview
title: Overview
sidebar_position: 1
---

# Webhook simulator

**User story HU-17:** *As the data team, I want to build a webhook simulator for 5 Type A carriers, so that I can test the
ingestion of real events.*

The simulator is a service **independent of the backend** (its own repository, Docker image and dependencies). It generates
tracking events the way 5 real carriers would and sends them over HTTP (the *push* model).

## What it does

1. **Generates shipments** that follow a realistic lifecycle: created, picked up, in transit, out for delivery and delivered,
   with variants (exception, return, loss, cancellation).
2. **Serializes each event** in the carrier's own format: flat JSON, nested JSON, Spanish-language JSON, XML or form data.
3. **Injects chaos** in a configurable way: duplicated events and out-of-order events.
4. **Sends** each message to one URL per carrier, or **publishes it to S3** so it can be read with `GET`.

## Components

| Component | Purpose |
|---|---|
| `python -m webhook_simulator` | Sends events over HTTP continuously or up to a limit |
| `python -m webhook_simulator.sink` | Local test receiver: stores what arrives and shows statistics |
| `python -m webhook_simulator.publisher` | Generates a batch and saves it to S3 or to a local folder |

## What it does not do

- **It is not the backend ingestion.** The backend does not have an endpoint that receives webhooks yet, so the target is
  configurable and defaults to the bundled test receiver.
- **It does not store real data:** everything it generates is simulated.
