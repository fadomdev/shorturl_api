import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();
// Configuración optimizada para serverless
// Usa DATABASE_URL si está disponible (Vercel Postgres), sino usa variables individuales
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Fallback a variables individuales si DATABASE_URL no está disponible
    user: process.env.DATABASE_URL ? undefined : process.env.DB_USER,
    host: process.env.DATABASE_URL ? undefined : process.env.DB_HOST,
    database: process.env.DATABASE_URL ? undefined : process.env.DB_NAME,
    password: process.env.DATABASE_URL ? undefined : process.env.DB_PASSWORD,
    port: process.env.DATABASE_URL ? undefined : (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432),
    // Configuraciones importantes para serverless
    max: 1, // Máximo 1 conexión en serverless
    idleTimeoutMillis: 0, // No timeout en serverless
    connectionTimeoutMillis: 5000 // 5s timeout
});
// Exportar el pool para usar en otros archivos
export default pool;
