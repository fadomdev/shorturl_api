import bcrypt from 'bcrypt'
import db from '../config/db.js'
import zod from 'zod'
import logger from '../utils/logger.js'
import { User, UserCredentials } from '../types/User.js'

const saltRounds = 10
const userSchema = zod.object({
  name: zod.string().min(2).max(100),
  email: zod.string().email(),
  password: zod.string().min(6).max(100)
})

const validateUser = (userData: User) => {
  return userSchema.safeParse(userData)
}

const validateUserLogin = (loginData: UserCredentials) => {
  return userSchema
    .partial({
      name: true
    })
    .safeParse(loginData)
}

const registerUser = async (userData: Omit<User, 'id'>) => {
  const { name, email, password } = userData

  if (!password) {
    throw new Error('Password is required')
  }

  const hashedPassword = bcrypt.hashSync(password, saltRounds)

  // Guardar el nuevo usuario en la base de datos
  const query =
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id'
  const values = [name, email, hashedPassword]

  try {
    const res = await db.query(query, values)
    return res.rows[0].id
  } catch (err) {
    logger.error('Error al registrar usuario:', err)
    throw err
  }
}

const getUserByEmail = async (email: string) => {
  const query = 'SELECT id, name, email, password FROM users WHERE email = $1'
  const values = [email]

  try {
    const res = await db.query(query, values)
    return res.rows[0]
  } catch (err) {
    logger.error('Error al obtener usuario por email:', err)
    throw err
  }
}

const loginUserWithCredentials = async (credentials: UserCredentials) => {
  // Lógica para autenticar un usuario
  const { email, password } = credentials

  const user = await getUserByEmail(email)
  if (!user) {
    throw new Error('Usuario no encontrado')
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Contraseña incorrecta')
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  }
}

export {
  registerUser,
  getUserByEmail,
  loginUserWithCredentials,
  validateUser,
  validateUserLogin
}
