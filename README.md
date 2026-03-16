# CodigoTech

Aplicacion Flutter para consulta de activos desde un backend desplegado.

## Funcionalidades

- Inicio de sesion contra el backend remoto.
- Busqueda de persona a codigos de activos.
- Busqueda de codigo a nombre de persona.
- Coincidencia flexible de codigos como `001` -> `lapt-001`.

## Backend consumido

- URL base: `https://asset-app-back.onrender.com`
- Login: `POST /auth/login`
- Consulta principal: `GET /assets/by-person`

## Ejecutar

```bash
flutter pub get
flutter run
```

## Estructura

El proyecto esta organizado con separacion por carpetas para controladores, modelos, repositorios, servicios, vistas y utilidades.
