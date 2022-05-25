import tagsApi from '@/api/tags'
import {defineStore} from 'pinia'

export const useTagsStore = defineStore({
  id: 'tags',
  state: () => ({
    tags: null as string[] | null,
    isLoading: false,
    error: null,
  }),
  actions: {
    getTagsStart() {
      this.tags = null
      this.isLoading = true
    },
    getTagsSuccess(tags: string[]) {
      this.tags = tags
      this.isLoading = false
    },
    getTagsFailure(err: any) {
      this.isLoading = false
      this.error = err
    },
    async getTags() {
      this.getTagsStart()

      try {
        const res = await tagsApi.getTags()
        this.getTagsSuccess(res.data.tags)
      } catch (err: any) {
        this.getTagsFailure(err)
      }
    },
  },
})
