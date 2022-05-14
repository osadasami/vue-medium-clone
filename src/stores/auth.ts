import authApi, {
  type CredentialsLogin,
  type CredentialsRegister,
} from '@/api/auth'
import {setItem} from '@/helpers/localStorage'
import {defineStore} from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isSubmitting: false,
    user: null as any,
    errors: null,
  }),
  getters: {},
  actions: {
    registerStart() {
      this.isSubmitting = true
      this.errors = null
    },
    registerSuccess(user: any) {
      this.isSubmitting = false
      this.user = user
    },
    registerFailure(errors: any) {
      this.isSubmitting = false
      this.errors = errors
    },
    async register(credentials: CredentialsRegister) {
      this.registerStart()

      try {
        const res = await authApi.register(credentials)
        setItem('token', res.data.user.token)
        this.registerSuccess(res.data.user)
      } catch (err: any) {
        this.registerFailure(err.response.data.errors)
      }
    },

    async login(credentials: CredentialsLogin) {
      this.loginStart()
      try {
        const res = await authApi.login(credentials)
        setItem('token', res.data.user.token)
        this.loginSuccess(res.data.user)
      } catch (err: any) {
        console.log(err)
        this.loginFailure(err.response.data.errors)
      }
    },

    loginStart() {
      this.isSubmitting = true
      this.errors = null
    },

    loginSuccess(user: any) {
      this.isSubmitting = false
      this.user = user
    },

    loginFailure(errors: any) {
      this.isSubmitting = false
      this.errors = errors
    },
  },
})
