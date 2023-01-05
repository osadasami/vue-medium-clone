import userProfileApi from '@/api/userProfile'
import type {Errors, Profile} from '@/types'
import {defineStore} from 'pinia'

export const useUserProfileStore = defineStore({
  id: 'user-profile',
  state: () => ({
    profile: null as Profile | null,
    isLoading: false,
    error: null as Errors | null,
  }),
  actions: {
    getUserProfileStart() {
      this.isLoading = true
      this.profile = null
      this.error = null
    },
    getUserProfileSuccess(profile: Profile) {
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
