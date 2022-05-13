import axios from '@/api/axios'

export type CredentialsRegister = {
  email: string
  username: string
  password: string
}

export type CredentialsLogin = {
  email: string
  password: string
}

function register(credentials: CredentialsRegister) {
  return axios.post('/users', {user: credentials})
}

function login(credentials: CredentialsLogin) {
  return axios.post('/users/login', {user: credentials})
}

export default {
  register,
  login,
}
