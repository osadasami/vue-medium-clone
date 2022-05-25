import articleApi from '@/api/article'
import {useCommentsStore} from '@/stores/comments'
import type {Article} from '@/types'
import {defineStore} from 'pinia'

export const useArticleStore = defineStore({
  id: 'article',
  state: () => ({
    data: null as Article | null,
    isLoading: false,
    error: null,
  }),
  actions: {
    getArticleStart() {
      this.isLoading = true
      this.data = null
      this.error = null
    },
    getArticleSuccess(article: Article) {
      this.data = article
      this.isLoading = false
    },
    getArticleFailure(error: any) {
      this.error = error
      this.isLoading = false
    },
    async getArticle(slug: string) {
      const commentsStore = useCommentsStore()
      this.getArticleStart()

      try {
        const article = await articleApi.getArticle(slug)
        this.getArticleSuccess(article)
        commentsStore.getComments(slug)
      } catch (error: any) {
        this.getArticleFailure(error)
      }
    },

    // delete article
    deleteArticleStart() {
      this.isLoading = true
      this.error = null
    },
    deleteArticleSuccess() {
      this.data = null
      this.isLoading = false
    },
    deleteArticleFailure(error: any) {
      this.error = error
      this.isLoading = false
    },
    async deleteArticle(slug: string) {
      this.deleteArticleStart()

      try {
        await articleApi.deleteArticle(slug)
        this.deleteArticleSuccess()
      } catch (error: any) {
        this.deleteArticleFailure(error)
      }
    },
  },
})
