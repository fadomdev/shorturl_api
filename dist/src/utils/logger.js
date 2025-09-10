import winston from 'winston';
// Detectar si estamos en Vercel/serverless (no filesystem writes)
const isServerless = process.env.VERCEL || process.env.NODE_ENV === 'production';
const transports = [
    // Log en consola (siempre disponible)
    new winston.transports.Console({
        format: winston.format.simple()
    })
];
// Solo agregar file transports en desarrollo local
if (!isServerless) {
    transports.push(new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), new winston.transports.File({ filename: 'logs/combined.log' }));
}
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de logs (error, warn, info, debug)
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), winston.format.json()),
    transports
});
export default logger;
