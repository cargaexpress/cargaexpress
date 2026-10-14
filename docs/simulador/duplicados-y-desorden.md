---
id: duplicados-y-desorden
title: Duplicados y eventos fuera de orden
sidebar_position: 5
---

# Duplicados y eventos fuera de orden

Las transportadoras reales reintentan webhooks y a veces los entregan desordenados. El simulador reproduce ambos
problemas con dos probabilidades **independientes**.

## Cómo se construye cada lote

1. Se generan varios envíos, cada uno con sus eventos en el orden en que ocurrieron.
2. Los envíos se **mezclan entre sí**, sin alterar el orden interno de cada uno.
3. **Fuera de orden:** con probabilidad `SIM_OUT_OF_ORDER_RATE`, un evento se intercambia con otro posterior **del mismo envío**.
   Por ejemplo, llega «Entregada» antes de «En reparto».
4. **Duplicados:** con probabilidad `SIM_DUPLICATE_RATE`, un evento se reenvía **idéntico byte a byte** (mismo identificador y
   mismo contenido), entre 0 y `SIM_DUPLICATE_MAX_DELAY` mensajes después.

## Garantías

| Garantía | Detalle |
|---|---|
| Tasa 0 | No hay duplicados ni desorden |
| Tasa 1 | Todos los eventos se duplican (o se desordenan cuando es posible) |
| Mismos eventos | El desorden no pierde ni inventa eventos |
| Duplicado idéntico | Mismo mensaje, mismo identificador de evento |
| Reproducible | Con la misma semilla (`SIM_SEED`) la secuencia es la misma |

## Cómo se cuentan

| Cifra | Significado |
|---|---|
| Mensajes | Todo lo enviado, incluidos duplicados |
| Únicos | Eventos distintos |
| Duplicados | Reenvíos idénticos |
| Fuera de orden | Eventos que llegan después de otro más reciente de su mismo envío |

:::tip Para la ingesta
Un receptor correcto debe ser **idempotente** (ignorar un identificador de evento ya visto) y **tolerar el desorden** (ordenar
por la hora del evento, no por la hora de llegada, y no retroceder un envío ya entregado).
:::
