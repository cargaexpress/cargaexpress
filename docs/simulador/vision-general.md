---
id: vision-general
title: Visión general
sidebar_position: 1
---

# Simulador de webhooks

**Historia HU-17:** *Como equipo de datos quiero construir un simulador de webhooks para 5 transportadoras Tipo A, para
probar la ingesta de eventos reales.*

El simulador es un servicio **independiente del backend** (repositorio, imagen de Docker y dependencias propias). Genera
eventos de seguimiento como lo harían 5 transportadoras reales y los envía por HTTP (modelo *push*).

## Qué hace

1. **Genera envíos** que recorren un ciclo de vida realista: creado, recolectado, en tránsito, en reparto y entregado, con
   variantes (novedad, devolución, pérdida, cancelación).
2. **Serializa cada evento** en el formato propio de la transportadora: JSON plano, JSON anidado, JSON en español, XML o
   formulario.
3. **Inyecta caos** de forma configurable: eventos duplicados y eventos fuera de orden.
4. **Envía** cada mensaje a una URL por transportadora, o lo **publica en S3** para consultarlo con `GET`.

## Piezas

| Pieza | Para qué sirve |
|---|---|
| `python -m webhook_simulator` | Envía eventos por HTTP de forma continua o hasta un límite |
| `python -m webhook_simulator.sink` | Receptor de pruebas local: guarda lo que llega y muestra estadísticas |
| `python -m webhook_simulator.publisher` | Genera un lote y lo guarda en S3 o en una carpeta local |

## Qué no hace

- **No es la ingesta del backend.** El backend todavía no tiene un endpoint que reciba webhooks, por eso el destino es
  configurable y por defecto apunta al receptor de pruebas incluido.
- **No guarda datos reales:** todo lo que genera es simulado.
