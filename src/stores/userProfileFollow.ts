import userProfileApi from '@/api/userProfile'
import {useUserProfileStore} from '@/stores/userProfile'
import {defineStore} from 'pinia'

export const useUserProfileFollowStore = defineStore({
  id: 'user-profile-follow',
  state: () => ({
    isLoading: false,
    error: null,
  }),
  actions: {
    followStart() {
      this.isLoading = true
      this.error = null
    },
    followSuccess(profile: any) {
      const userProfileStore = useUserProfileStore()
      this.isLoading = false
      userProfileStore.getUserProfileSuccess(profile)
    },
    followFailure(error: null) {
      this.isLoading = false
      this.error = error
    },
    async follow(username: string, isFollowing: boolean) {
      this.followStart()
      try {
        const res = await userProfileApi.follow(username, isFollowing)
        this.followSuccess(res.data.profile)
      } catch (error: any) {
        this.followFailure(error)
      }
    },
  },
})
