---
id: publicar-en-s3
title: Publicar datos en AWS S3
sidebar_position: 7
---

# Publicar datos en AWS S3 y consultarlos con GET

Además de enviar por HTTP, el simulador puede **generar un lote y guardarlo en S3** para leerlo con `GET` desde cualquier
lugar. No hay servidores encendidos: es solo almacenamiento.

:::note
Este modo **no recibe** webhooks: publica datos para leer. Para el envío push se usa `python -m webhook_simulator`.
:::

## Qué se publica

| URL (bajo la carpeta `simulador/`) | Contenido |
|---|---|
| `index.json` | Resumen: configuración, totales y lista de archivos |
| `events/all.ndjson` | Todos los mensajes, uno por línea, en orden de llegada |
| `events/<transportadora>.ndjson` | Los mensajes de una transportadora |

Cada línea es un JSON con `sequence`, `carrier`, `content_type`, `duplicate` y `body` (el mensaje tal cual lo enviaría esa
transportadora).

## Ruta fácil (solo clics en la consola de AWS)

### Parte 1: generar los archivos en tu computador

Necesitas Python 3.12 o superior; no hay que instalar nada más. Desde la carpeta del simulador:

```bash
python3 -m webhook_simulator.publisher --local-dir salida --events 1000 --seed 1
```

En Windows usa `python` en lugar de `python3`. Se crea `salida/simulador/` con `index.json` y la carpeta `events`.

### Parte 2: crear el bucket

1. Entra a la consola de AWS, servicio **S3**, y pulsa **Create bucket**.
2. **Bucket name:** un nombre único en todo AWS (minúsculas, números y guiones).
3. **Object Ownership:** deja «ACLs disabled».
4. **Block Public Access:** desmarca «Block all public access» y confirma el aviso.
5. Pulsa **Create bucket**.

### Parte 3: permitir la lectura (GET)

En la pestaña **Permissions** del bucket, en **Bucket policy**, pega esto cambiando `NOMBRE-DE-TU-BUCKET`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LecturaPublicaDeDatosSimulados",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::NOMBRE-DE-TU-BUCKET/simulador/*"
    }
  ]
}
```

### Parte 4: subir los archivos

En la pestaña **Objects** pulsa **Upload → Add folder** y elige la carpeta `salida/simulador` (**la carpeta `simulador`
completa**, no la carpeta `salida`). La política solo da permiso a la ruta `simulador/*`.

### Parte 5: hacer el GET

```text
https://NOMBRE-DE-TU-BUCKET.s3.REGION.amazonaws.com/simulador/index.json
```

La región debe ser **la del bucket** (por ejemplo `us-east-2`). Si no, AWS responde `PermanentRedirect` e indica la región
correcta en `Endpoint`.

:::tip Los archivos .ndjson se descargan
El navegador descarga los `.ndjson` en lugar de mostrarlos. Ábrelos con un editor de texto o usa Postman con `GET`.
:::

## Ruta con AWS CLI

Con una plantilla de CloudFormation que crea el bucket con lectura pública solo de `simulador/`, CORS y borrado automático a
los 30 días:

```bash
aws cloudformation deploy \
  --template-file deploy/aws/bucket.yaml \
  --stack-name cargaexpress-simulador \
  --parameter-overrides BucketName=NOMBRE-DE-TU-BUCKET \
  --region us-east-2
uv sync --extra aws
uv run python -m webhook_simulator.publisher --bucket NOMBRE-DE-TU-BUCKET --region us-east-2 --events 1000 --seed 1
```

## Para apagar todo

En S3, selecciona el bucket, pulsa **Empty** y luego **Delete**. Con CLI:

```bash
aws s3 rm s3://NOMBRE-DE-TU-BUCKET --recursive
aws cloudformation delete-stack --stack-name cargaexpress-simulador
```

## Seguridad

La lectura es **pública**: úsalo solo con datos simulados. Nunca guardes claves de AWS en el repositorio.
