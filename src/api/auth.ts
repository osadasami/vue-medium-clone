import axios from '@/api/axios'

export type Credentials = {
  email: string
  username: string
  password: string
}

function register(credentials: Credentials) {
  return axios.post('/users', {user: credentials})
}

export default {
  register,
}
