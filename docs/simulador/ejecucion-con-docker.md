---
id: ejecucion-con-docker
title: Ejecución y Docker
sidebar_position: 6
---

# Ejecución y Docker

## Con Docker (recomendado)

```bash
docker compose up --build              # simulador + receptor de pruebas en el puerto 9000
curl localhost:9000/stats              # mensajes recibidos y mensajes idénticos repetidos
curl "localhost:9000/received?carrier=delta&limit=3"
docker compose run --rm tests          # pruebas automáticas (perfil "test")
docker compose down
```

El compose define tres servicios, independientes del compose del backend:

| Servicio | Qué hace |
|---|---|
| `sink` | Receptor de pruebas, con comprobación de salud (`/health`) |
| `simulator` | Envía eventos al `sink` cuando este está sano |
| `tests` | Ejecuta las pruebas (solo con el perfil `test`) |

Para cambiar el comportamiento: `SIM_DUPLICATE_RATE=0.5 docker compose up`, o un archivo `.env` junto al compose.
Para enviar a un backend en tu máquina: `SIM_TARGET_URL_TEMPLATE=http://host.docker.internal:8000/webhooks/{carrier}`.

### Qué tiene el Dockerfile

Es multietapa: dependencias, pruebas y ejecución. Usa `uv` fijado a la misma versión que el backend, instala con
`uv sync --frozen` y la imagen final corre con un usuario sin privilegios.

:::warning Estado de la verificación
Los archivos de Docker están escritos y revisados, y el simulador se ejecutó en un entorno equivalente a la imagen final.
Pero el entorno donde se desarrolló **no tenía Docker**, así que `docker compose up --build` debe probarse en una máquina con
Docker antes de dar la subtarea por cerrada.
:::

## Sin Docker

```bash
uv sync --python 3.12
uv run python -m webhook_simulator.sink --port 9000 &            # receptor de pruebas
uv run python -m webhook_simulator --max-events 200 --seed 1     # simulador
uv run pytest -q
```

## Receptor de pruebas

Solo usa la biblioteca estándar y guarda en memoria lo que llega, sin interpretarlo.

| Ruta | Qué hace |
|---|---|
| `POST /webhooks/<transportadora>` | Recibe un evento |
| `GET /stats` | Totales, por transportadora y mensajes idénticos repetidos |
| `GET /received?carrier=&limit=` | Últimos mensajes recibidos |
| `GET /health` | Estado del servicio |
