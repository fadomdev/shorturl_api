import winston from 'winston'

const logger = winston.createLogger({
  level: 'info', // Nivel mínimo de logs (error, warn, info, debug)
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Log en consola
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    // Log en archivo (opcional)
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
})

export default logger
