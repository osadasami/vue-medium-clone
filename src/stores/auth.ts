import authApi, {type Credentials} from '@/api/auth'
import {defineStore} from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isSubmitting: false,
    user: null,
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
    async register(credentials: Credentials) {
      this.registerStart()

      try {
        const res = await authApi.register(credentials)
        this.registerSuccess(res.data.user)
      } catch (err: any) {
        this.registerFailure(err.response.data.errors)
      }
    },
  },
})
