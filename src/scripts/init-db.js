// filepath: g:\Proyectos\shorturl_api\scripts\init-db.js
import pool from '../config/db.js'

async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log('Tabla users creada o ya existe.')
  } catch (err) {
    console.error('Error al crear tabla:', err)
  } finally {
    pool.end()
  }
}

initDB()
