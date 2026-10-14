---
id: cumplimiento-hu-17
title: Cumplimiento de HU-17
sidebar_position: 8
---

# Cumplimiento de HU-17

**Tarea:** RIWI-82 (padre RIWI-81) · **Subtareas:** RIWI-83, RIWI-84, RIWI-85, RIWI-86

## Criterio de aceptación

> El simulador envía eventos con diferentes formatos, estados variados y eventos duplicados o fuera de orden.

| Parte del criterio | Cómo se cumple |
|---|---|
| Diferentes formatos | 5 transportadoras, 5 formatos: JSON plano, JSON anidado, JSON en español, XML y formulario |
| Estados variados | 10 u 11 estados por transportadora y ciclos con novedad, devolución, pérdida y cancelación |
| Duplicados | Reenvío idéntico byte a byte, con probabilidad y retraso configurables |
| Fuera de orden | Un evento se intercambia con otro posterior del mismo envío |

## Subtareas

| Subtarea | Requisito | Estado |
|---|---|---|
| RIWI-83 | Servicio que genera eventos aleatorios por transportadora | Hecha y probada |
| RIWI-84 | Catálogo de al menos 6 estados propios por transportadora | Hecha (10 u 11 por transportadora) |
| RIWI-85 | Duplicados y fuera de orden configurables | Hecha y probada |
| RIWI-86 | Dockerizar el simulador por separado del backend | Hecha; **falta probar `docker compose up --build` en una máquina con Docker** |

## Verificación realizada

- **76 pruebas automáticas** pasan. Otras 3 (comparar los estados con la migración del backend) solo corren si el simulador se
  coloca dentro del repositorio del backend.
- **Pruebas de mutación:** se rompió el código a propósito en 7 puntos y las pruebas fallaron en los 7.
- **Ejecución real** en un entorno limpio con solo dependencias de producción: 300 mensajes contra un receptor real, sin fallos;
  parada limpia con `SIGTERM`; destino caído contado como fallos con código de salida 1.
- **Publicación en S3** comprobada con un S3 simulado y con un bucket real: el resumen respondió con 1000 mensajes (916
  únicos, 84 duplicados y 142 fuera de orden).

## Limitaciones conocidas

- No existe todavía un endpoint de ingesta de webhooks en el backend.
- Delta y Epsilon no tienen transportadora ni mapeo de estados en la base de datos del backend.
- Docker no se ejecutó en el entorno de desarrollo.
