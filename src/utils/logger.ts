import winston from 'winston'
import fs from 'fs'
import path from 'path'

const isServerless =
  !!process.env.VERCEL || process.env.NODE_ENV === 'production'

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.printf(
        (info) => `${info.timestamp} [${info.level}] ${info.message}`
      )
    )
  })
]

// Solo escribir archivos en desarrollo local (no en Vercel)
if (!isServerless) {
  const logDir = path.join(process.cwd(), 'logs')
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true })
  }
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    })
  )
  transports.push(
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  )
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports
})

export default logger
