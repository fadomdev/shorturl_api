export interface User {
  id: number
  name: string
  email: string
  password?: string | undefined // Opcional para respuestas
}

export interface UserCredentials {
  email: string
  password: string
}

export type PublicUser = Omit<User, 'password'>
