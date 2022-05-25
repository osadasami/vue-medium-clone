import feedApi from '@/api/feed'
import type {Articles} from '@/types'
import {defineStore} from 'pinia'

export const useFeedStore = defineStore({
  id: 'feed',
  state: () => ({
    data: null as Articles | null,
    isLoading: false,
    error: null,
  }),
  getters: {},
  actions: {
    getFeedStart() {
      this.isLoading = true
      this.error = null
      this.data = null
    },
    getFeedSuccess(data: Articles) {
      this.isLoading = false
      this.data = data
    },
    getFeedFailure(error: any) {
      this.isLoading = false
      this.error = error
    },
    async getFeed({url}: any) {
      this.getFeedStart()

      try {
        const res = await feedApi.getFeed(url)
        this.getFeedSuccess(res.data)
      } catch (err) {
        this.getFeedFailure(err)
      }
    },
  },
})
