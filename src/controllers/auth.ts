import { Request, Response } from 'express'
import dotenv from 'dotenv'
import {
  validateUserLogin,
  getUserByEmail,
  loginUserWithCredentials
} from '../models/User.js'

dotenv.config()

const loginUser = async (req: Request, res: Response) => {
  const loginValidated = validateUserLogin(req.body)

  if (!loginValidated.success) {
    return res.status(400).json({
      error: 'Invalid login data',
      details: JSON.parse(loginValidated.error.message)
    })
  }

  const userExists = await getUserByEmail(loginValidated.data.email)
  if (!userExists) {
    return res.status(404).json({ error: 'User not found' })
  }

  const userLogged = await loginUserWithCredentials(loginValidated.data)
  if (!userLogged) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Lógica para autenticar un usuario
  res.status(200).json({ message: 'Login endpoint', user: userLogged })
}

export { loginUser }
