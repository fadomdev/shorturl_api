import request from 'supertest'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import app from '../index.js'

// Mock del módulo db
vi.mock('../config/db.js', () => {
  const stored = []
  return {
    default: {
      __reset: () => {
        stored.length = 0
      },
      query: vi.fn(async (q, values) => {
        if (q.startsWith('SELECT * FROM users')) {
          const email = values[0]
          return { rows: stored.filter((u) => u.email === email) }
        }
        if (q.startsWith('INSERT INTO users')) {
          const [name, email, password] = values
          // Simular restricción única
          if (stored.find((u) => u.email === email)) {
            const err = new Error('duplicate key value')
            err.code = '23505' // Código Postgres unique_violation
            throw err
          }
          const newUser = { id: stored.length + 1, name, email, password }
          stored.push(newUser)
          return { rows: [{ id: newUser.id }] }
        }
        return { rows: [] }
      })
    }
  }
})

import db from '../config/db.js'

describe('POST /api/v1/auth/register', () => {
  beforeEach(() => {
    db.__reset()
  })

  it('falla si faltan campos', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ email: 'incompleto@example.com' })

    expect(res.status).toBe(400)
  })

  it('falla si el email ya está en uso', async () => {
    // Primer registro (éxito)
    const first = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Ana', email: 'ana@example.com', password: 'Secret123' })
    expect(first.status).toBe(201)

    // Segundo con mismo email (conflicto)
    const second = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Ana2', email: 'ana@example.com', password: 'Secret123' })

    expect(second.status).toBe(409)
    expect(second.body).toHaveProperty('error', 'El email ya está en uso')
  })

  it('registra usuario válido', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ name: 'Juan', email: 'juan@example.com', password: 'Secret123' })

    expect(res.status).toBeGreaterThanOrEqual(200)
    expect(res.status).toBeLessThan(300)
    expect(res.body).toHaveProperty('id')
  })
})
