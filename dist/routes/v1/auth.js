import express from 'express';
import dotenv from 'dotenv';
import { createUser } from '../../controllers/user.js';
import { loginUser } from '../../controllers/auth.js';
// Cargar variables de entorno desde .env
dotenv.config();
const authRouter = express.Router();
authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
export default authRouter;
