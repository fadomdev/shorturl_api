import { registerUser, getUserByEmail } from '../models/User.js'

async function getUser(req, res) {
  const userId = req.params.id
  try {
    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.json(user)
  } catch (err) {
    console.error('Error al obtener usuario:', err)
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

async function createUser(req, res) {
  const userData = req.body
  try {
    const userEmail = await getUserByEmail(userData.email)

    //validate fields
    if (!userData.name || !userData.email || !userData.password) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    if (userEmail) {
      return res.status(409).json({ error: 'El email ya está en uso' })
    }

    const userId = await registerUser(userData)
    res.status(201).json({ id: userId })
  } catch (err) {
    console.error('Error al registrar usuario:', err)
    res.status(500).json({ error: 'Error al registrar usuario' })
  }
}

export { createUser, getUser }
