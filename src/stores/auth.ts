import {defineStore} from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isSubmitting: false,
  }),
  getters: {},
  actions: {
    registerStart() {
      this.isSubmitting = true
    },
  },
})
