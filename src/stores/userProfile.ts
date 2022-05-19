import userProfileApi from '@/api/userProfile'
import {defineStore} from 'pinia'

export const useUserProfileStore = defineStore({
  id: 'user-profile',
  state: () => ({
    profile: null as any,
    isLoading: false,
    error: null as any,
  }),
  actions: {
    getUserProfileStart() {
      this.isLoading = true
      this.profile = null
      this.error = null
    },
    getUserProfileSuccess(profile: any) {
      this.isLoading = false
      this.profile = profile
    },
    getUserProfileFailure(error: null) {
      this.isLoading = false
      this.error = error
    },
    async getUserProfile(slug: string) {
      this.getUserProfileStart()
      try {
        const profile = await userProfileApi.getUserProfile(slug)
        this.getUserProfileSuccess(profile)
      } catch (err: any) {
        this.getUserProfileFailure(err)
      }
    },
  },
})
