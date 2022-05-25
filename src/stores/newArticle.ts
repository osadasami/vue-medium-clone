import articleApi from '@/api/article'
import router from '@/router'
import type {Article} from '@/types'
import {defineStore} from 'pinia'

export const useNewArticleStore = defineStore({
  id: 'new-article',
  state: () => ({
    isSubmitting: false,
    error: null as null | string[],
  }),
  actions: {
    createArticleStart() {
      this.isSubmitting = true
      this.error = null
    },
    createArticleSuccess() {
      this.isSubmitting = false
    },
    createArticleFailure(error: any) {
      this.isSubmitting = false
      this.error = error
    },
    async createArticle(data: Article) {
      this.createArticleStart()

      try {
        const article = await articleApi.createArticle(data)
        router.push({name: 'article', params: {slug: article.slug}})
      } catch (error: any) {
        this.createArticleFailure(error)
      }
    },
  },
})
