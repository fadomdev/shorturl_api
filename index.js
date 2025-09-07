import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import shortenRouter from './routes/v1/shorten.js'
import authRouter from './routes/v1/auth.js'

// Cargar variables de entorno desde .env
dotenv.config()

const app = express()

// Middleware de seguridad
app.use(cors({ origin: process.env.APP_URL || 'http://localhost' }))

// Middleware de seguridad HTTP headers
app.use(helmet())

// Middleware para parsear JSON
app.use(express.json())

// Puerto del servidor
const PORT = process.env.PORT || 3000

// URL de la aplicación
const APP_URL = process.env.APP_URL || 'http://localhost'

// Crear router principal para /api/v1
const apiRouter = express.Router()
apiRouter.use('/shorten', shortenRouter)
apiRouter.use('/auth', authRouter)
app.use('/api/v1', apiRouter)

// Ruta básica
app.get('/', (req, res) => {
  res.json({
    name: 'ShortURL',
    message: '¡API de acortador de URLs!',
    version: '1.0.0'
  })
})

// Iniciar servidor

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${APP_URL}:${PORT}`)
  })
}

export default app

// Exportar app para pruebas
