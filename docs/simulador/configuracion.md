---
id: configuracion
title: Configuración
sidebar_position: 4
---

# Configuración

Todo se configura con **variables de entorno** `SIM_*` o con **opciones de línea de comandos**. Si ambas existen, gana la
opción de línea de comandos.

| Variable | Opción | Por defecto | Qué hace |
|---|---|---|---|
| `SIM_TARGET_URL_TEMPLATE` | `--target-url-template` | `http://localhost:9000/webhooks/{carrier}` | Destino; `{carrier}` se reemplaza por `alpha`, `beta`, `gamma`, `delta` o `epsilon` |
| `SIM_CARRIERS` | `--carriers` | las 5 | Transportadoras a simular, separadas por coma |
| `SIM_RATE` | `--rate` | `5` | Mensajes por segundo (0 = sin pausas) |
| `SIM_SHIPMENTS_PER_BATCH` | `--shipments-per-batch` | `20` | Envíos que se generan y mezclan en cada lote |
| `SIM_MAX_EVENTS` | `--max-events` | `0` | Detenerse tras N mensajes (0 = sin límite) |
| `SIM_DUPLICATE_RATE` | `--duplicate-rate` | `0.10` | Probabilidad (0 a 1) de reenviar un evento idéntico |
| `SIM_OUT_OF_ORDER_RATE` | `--out-of-order-rate` | `0.10` | Probabilidad (0 a 1) de que un evento llegue después de uno posterior de su envío |
| `SIM_DUPLICATE_MAX_DELAY` | `--duplicate-max-delay` | `5` | Un duplicado llega, como máximo, N mensajes después del original |
| `SIM_SEED` | `--seed` | aleatoria | Repite exactamente la misma simulación |
| `SIM_DRY_RUN` | `--dry-run` / `--no-dry-run` | `false` | Muestra los mensajes (un JSON por línea) sin enviarlos |
| `SIM_REQUEST_TIMEOUT` | `--timeout` | `5` | Segundos máximos de espera por cada envío |

## Validaciones

Los valores inválidos terminan el programa con un mensaje claro: tasas fuera de 0 a 1, transportadoras desconocidas, una URL
sin `{carrier}`, `rate` negativo, lotes de menos de 1 envío o `timeout` menor o igual a 0.

## Resumen y código de salida

Al terminar (o al detenerlo con Ctrl+C o `docker stop`) imprime un resumen: enviados, entregados (respuestas 2xx), fallidos,
únicos, duplicados y fuera de orden. Con `--max-events` y ninguna entrega correcta, termina con **código 1**.

## Ejemplos

```bash
# 200 mensajes, siempre la misma simulación
python -m webhook_simulator --max-events 200 --seed 1

# Solo Delta y Epsilon, con muchos duplicados
python -m webhook_simulator --carriers delta,epsilon --duplicate-rate 0.5

# Ver los mensajes sin enviar nada
python -m webhook_simulator --dry-run --max-events 10
```
