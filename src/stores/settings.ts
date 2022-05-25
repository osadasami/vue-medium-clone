import authApi from '@/api/auth'
import {useAuthStore} from '@/stores/auth'
import type {User} from '@/types'
import {defineStore} from 'pinia'

export const useSettingsStore = defineStore({
  id: 'settings',
  state: () => ({
    isSubmitting: false,
    errors: null,
  }),
  actions: {
    updateCurrentUserStart() {
      this.isSubmitting = true
      this.errors = null
    },
    updateurrentUserSuccess(user: User) {
      this.isSubmitting = false
      const authStore = useAuthStore()
      authStore.updateCurrentUserSuccess(user)
    },
    updateCurentUserFailure(errors: any) {
      this.isSubmitting = false
      this.errors = errors
    },
    async updateCurrentUser(user: User) {
      this.updateCurrentUserStart()

      try {
        const res = await authApi.updateCurrentUser(user)
        this.updateurrentUserSuccess(res.data.user)
      } catch (err) {
        console.log(err)
        this.updateCurentUserFailure(err)
      }
    },
  },
})
