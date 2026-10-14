---
id: convencion-de-commits
title: Convención de commits
sidebar_position: 1
---

# Convención de commits

Los commits del proyecto se escriben **en inglés**, con la estructura de *Conventional Commits* y siguiendo las
[buenas prácticas de midu.dev](https://midu.dev/buenas-practicas-escribir-commits-git/). Cada commit describe **un** cambio
claro y se hace **archivo por archivo (o grupo mínimo de archivos relacionados)**, nunca con `git add .`.

## Formato

```text
tipo(scope opcional): descripción corta

Cuerpo opcional: por qué se hizo el cambio y qué contexto hace falta.
```

- Primera línea de **50 caracteres como máximo**, en **imperativo** y en minúscula: `add`, `fix`, `change`, `remove`.
- Sin punto final ni puntos suspensivos en el título.
- Una línea en blanco entre el título y el cuerpo.
- Prueba útil: completa la frase *«Si aplico este commit, entonces este commit…»* (add a new search feature).
- Si el mensaje necesita muchas explicaciones, el commit hace demasiadas cosas: sepáralo.

## Tipos

| Tipo | Cuándo se usa |
|---|---|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de un error |
| `perf` | Mejora de rendimiento |
| `build` | Dependencias, empaquetado, despliegue |
| `ci` | Integración continua y hooks |
| `docs` | Documentación |
| `refactor` | Reorganizar código sin cambiar el comportamiento |
| `style` | Formato o estilos que no cambian la lógica |
| `test` | Añadir o ajustar pruebas |
| `chore` | Tareas de mantenimiento |

## Ejemplos

| ❌ No | ✅ Sí |
|---|---|
| `HU-17` | `feat(simulator): add carrier status catalog` |
| `Added search feature.` | `feat: add search by category` |
| `Fix a problem...` | `fix: remove broken link in sidebar` |
| `update` | `docs: describe carrier payload formats` |

El número de la historia puede ir **al final del cuerpo o del título como referencia** (`Refs HU-17`), pero nunca como único
contenido del mensaje.

## Cómo hacer un commit archivo por archivo

```bash
git add docs/simulador/estados.md        # solo ese archivo
git commit -m "docs: add carrier status catalog"
```

Para escribir un cuerpo, ejecuta `git commit` sin `-m` y se abrirá el editor.

## Validación automática

El repositorio incluye un hook `commit-msg` que rechaza los mensajes que no cumplen el formato. Actívalo una vez por clon:

```bash
git config core.hooksPath .githooks
```

El hook comprueba: tipo válido, 50 caracteres como máximo, sin punto final, descripción en minúscula, sin verbos en pasado o
gerundio (`added`, `fixing`…), que no sea solo un número de historia y la línea en blanco antes del cuerpo.

:::note Lo que el hook no puede revisar
El hook no detecta si el mensaje está en inglés ni si describe bien el cambio. Eso lo revisa quien hace el commit y quien revisa
el pull request.
:::
