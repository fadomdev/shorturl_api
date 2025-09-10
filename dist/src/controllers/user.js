import { registerUser, getUserByEmail } from '../models/User.js';
import { validateUser } from '../models/User.js';
/*
async function getUser(req: Request, res: Response) {
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
  */
async function createUser(req, res) {
    const userValidated = validateUser(req.body);
    if (!userValidated.success) {
        return res.status(400).json({
            error: 'La información del usuario no es válida',
            details: JSON.parse(userValidated.error.message)
        });
    }
    try {
        const userEmail = await getUserByEmail(userValidated.data.email);
        if (userEmail) {
            return res.status(409).json({ error: 'El email ya está en uso' });
        }
        const userId = await registerUser(userValidated.data);
        res.status(201).json({
            id: userId,
            name: userValidated.data.name,
            email: userValidated.data.email,
            message: 'Usuario registrado exitosamente'
        });
    }
    catch (err) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
}
export { createUser };
