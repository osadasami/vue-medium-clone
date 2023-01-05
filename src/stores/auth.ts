import auth from '@/api/auth'
import {setItem} from '@/helpers/localStorage'
import type {CredentialsLogin, CredentialsRegister, Errors, User} from '@/types'
import axios from 'axios'
import {defineStore} from 'pinia'
import {ref, type Ref} from 'vue'
import {useRouter} from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const isLoading: Ref<boolean> = ref(false)
  const user: Ref<User | null> = ref(null)
  const errors: Ref<Errors | null> = ref(null)
  const router = useRouter()

  async function login(credentials: CredentialsLogin) {
    isLoading.value = true
    errors.value = null
    user.value = null

    try {
      const res = await auth.login(credentials)
      user.value = res.data.user
      setItem('token', res.data.user.token)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        errors.value = (err.response?.data as {errors: Errors}).errors
      }
    } finally {
      isLoading.value = false
    }
  }

  async function register(credentials: CredentialsRegister) {
    isLoading.value = true
    errors.value = null
    user.value = null

    try {
      const res = await auth.register(credentials)
      setItem('token', res.data.user.token)
      router.push({name: 'profile'})
    } catch (err) {
      if (axios.isAxiosError(err)) {
        errors.value = (err.response?.data as {errors: Errors}).errors
      }
    } finally {
      isLoading.value = false
    }
  }
  function logout() {
    user.value = null
    setItem('token', '')
    router.push({name: 'home'})
  }
  async function getCurrentUser() {
    isLoading.value = true

    try {
      const res = await auth.getCurrentUser()
      user.value = res.data.user
    } catch (err) {
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    register,
    login,
    logout,
    getCurrentUser,
    errors,
    isLoading,
  }
})

//     async getCurrentUser() {
//       this.getCurrentUserStart()
//       try {
//         const res = await authApi.getCurrentUser()
//         this.getCurrentUserSuccess(res.data.user)
//       } catch (err: any) {
//         this.getCurrentUserFailure()
//       }
//     },
