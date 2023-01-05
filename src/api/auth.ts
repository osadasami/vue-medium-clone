import axios from '@/api/axios'
import type {
  CredentialsLogin,
  CredentialsRegister,
  User,
  UserResponse,
} from '@/types'
import type {AxiosResponse} from 'axios'

function register(
  credentials: CredentialsRegister
): Promise<AxiosResponse<UserResponse>> {
  return axios.post<UserResponse>('/users', {user: credentials})
}

function login(credentials: CredentialsLogin) {
  return axios.post('/users/login', {user: credentials})
}

function getCurrentUser(): Promise<AxiosResponse<UserResponse>> {
  return axios.get('/user')
}

function updateCurrentUser(user: User) {
  return axios.put('/user', {user})
}

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
}
