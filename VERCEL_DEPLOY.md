# Configuración para Vercel - ShortURL API

Este proyecto está configurado para desplegarse en Vercel como funciones serverless.

## Variables de entorno requeridas

En el dashboard de Vercel, configura estas variables:

### Base de datos (Vercel Postgres recomendado):

```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Configuración de aplicación:

```
NODE_ENV=production
APP_URL=https://tu-dominio.vercel.app
```

## Estructura para Vercel

- `/api/index.ts` - Función serverless principal que exporta la app Express
- `/src/app.ts` - Aplicación Express reutilizable
- `/src/index.ts` - Servidor local para desarrollo
- `vercel.json` - Configuración mínima (Vercel detecta automáticamente las funciones TS)

## Características optimizadas para serverless:

1. **Logger sin archivos**: Winston configurado para solo console en producción
2. **Pool de BD optimizado**: Máximo 1 conexión, sin timeouts
3. **Imports compatibles**: Usando extensiones .js para compatibilidad ESM/TS
4. **Build limpio**: TypeScript compilado correctamente

## Comandos de desarrollo:

```bash
# Desarrollo local
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción (local)
npm start

# Tests
npm test
```

## Deploy a Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

La API estará disponible en:

- Local: `http://localhost:3000/v1/auth/register`
- Vercel: `https://tu-dominio.vercel.app/api/v1/auth/register`
