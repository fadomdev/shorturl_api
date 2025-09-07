# ShortURL API

Una API simple para acortar URLs usando Node.js y Express.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Uso

Ejecuta `npm start` para iniciar el servidor.

El servidor se ejecutará en http://localhost:3000

## Endpoints

- GET / : Mensaje de bienvenida
- POST /shorten : Acorta una URL. Envía un JSON con {"url": "http://example.com"}

## Próximos pasos

- Agregar base de datos para almacenar URLs.
- Implementar redirección de URLs cortas.
- Agregar validación de URLs.
