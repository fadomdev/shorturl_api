import express from 'express'
import dotenv from 'dotenv'

import { createUser } from '../../controllers/user.js'

// Cargar variables de entorno desde .env
dotenv.config()

const authRouter = express.Router()

authRouter.post('/register', createUser)

export default authRouter
