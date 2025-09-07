import bcrypt from 'bcrypt'
import db from '../config/db.js'

const registerUser = async (userData) => {
  // Lógica para registrar un nuevo usuario
  const { name, email, password } = userData
  const hashedPassword = bcrypt.hashSync(password, 10)

  // Guardar el nuevo usuario en la base de datos
  const query =
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id'
  const values = [name, email, hashedPassword]

  try {
    const res = await db.query(query, values)
    return res.rows[0].id
  } catch (err) {
    console.error('Error al registrar usuario:', err)
    throw err
  }
}

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1'
  const values = [email]

  try {
    const res = await db.query(query, values)
    return res.rows[0]
  } catch (err) {
    console.error('Error al obtener usuario por email:', err)
    throw err
  }
}

const loginUser = async (credentials) => {
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

  return user
}

export { registerUser, getUserByEmail, loginUser }
