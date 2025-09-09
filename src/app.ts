import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import authRouter from './routes/v1/auth.js'
// import shortenRouter from './routes/v1/shorten' // habilitar cuando exista en TS

// Cargar variables de entorno
dotenv.config()

const app = express()

// Middlewares base
app.use(cors({ origin: process.env.APP_URL || '*' }))
app.use(helmet())
app.use(
  express.json({
    verify: (req: Request, res: Response, buf) => {
      if (!buf.length) return
      try {
        JSON.parse(buf.toString())
      } catch {
        return res.status(400).json({ error: 'JSON inválido en la solicitud' })
      }
    }
  })
)

// Router versión (IMPORTANTE: usar /v1 para evitar /api/api en Vercel)
const apiV1 = express.Router()
apiV1.use('/auth', authRouter)
// apiV1.use('/shorten', shortenRouter)
app.use('/v1', apiV1)

// Health / root info
app.get('/', (_req, res) => {
  res.json({ name: 'ShortURL', message: 'API OK', version: '1.0.0' })
})

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

export default app
