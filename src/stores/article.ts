import articleApi from '@/api/article'
import {defineStore} from 'pinia'

export const useArticleStore = defineStore({
  id: 'article',
  state: () => ({
    data: null as any,
    isLoading: false,
    error: null as any,
  }),
  getters: {},
  actions: {
    getArticleStart() {
      this.isLoading = true
      this.data = null
      this.error = null
    },
    getArticleSuccess(article: any) {
      this.data = article
      this.isLoading = false
    },
    getArticleFailure(error: any) {
      this.error = error
      this.isLoading = false
    },
    async getArticle(slug: string) {
      this.getArticleStart()

      try {
        const article = await articleApi.getArticle(slug)
        this.getArticleSuccess(article)
      } catch (error: any) {
        this.getArticleFailure(error)
      }
    },
  },
})
