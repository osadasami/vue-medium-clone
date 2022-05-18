import articleApi from '@/api/article'
import router from '@/router'
import {defineStore} from 'pinia'

export const useEditArticleStore = defineStore({
  id: 'edit-article',
  state: () => ({
    isSubmitting: false,
    error: null as null | string[],
  }),
  actions: {
    updateArticleStart() {
      this.isSubmitting = true
      this.error = null
    },
    updateArticleSuccess() {
      this.isSubmitting = false
    },
    updateArticleFailure(error: any) {
      this.isSubmitting = false
      this.error = error
    },
    async updateArticle(slug: string, data: any) {
      this.updateArticleStart()

      try {
        const article = await articleApi.updateArticle(slug, data)
        this.updateArticleSuccess()
        router.push({name: 'article', params: {slug: article.slug}})
      } catch (error: any) {
        this.updateArticleFailure(error)
      }
    },
  },
})
