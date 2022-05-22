import commentsApi from '@/api/comments'
import {defineStore} from 'pinia'

export const useCommentsStore = defineStore({
  id: 'comments',
  state: () => ({
    isLoading: false,
    error: null,
    data: null as any,
  }),
  actions: {
    getCommentsStart() {
      this.data = null
      this.error = null
      this.isLoading = true
    },
    getCommentsSuccess(comments: any) {
      this.data = comments
      this.isLoading = false
    },
    getCommentsFailure(error: any) {
      this.error = error
      this.isLoading = false
    },
    async getComments(slug: string) {
      this.getCommentsStart()
      try {
        const comments = await commentsApi.getComments(slug)
        this.getCommentsSuccess(comments)
      } catch (error: any) {
        this.getCommentsFailure(error)
      }
    },

    createCommentStart() {
      this.error = null
      this.isLoading = true
    },
    createCommentSuccess(comment: any) {
      this.isLoading = false
      this.data.push(comment)
    },
    createCommentFailure(error: any) {
      this.isLoading = false
      this.error = error
    },
    async createComment(slug: string, body: string) {
      this.createCommentStart()

      try {
        const comment = await commentsApi.createComment(slug, body)
        this.createCommentSuccess(comment)
      } catch (error) {
        this.createCommentFailure(error)
      }
    },

    deleteCommentStart() {
      this.isLoading = true
      this.error = null
    },
    deleteCommentSuccess(id: number) {
      this.isLoading = false
      this.data = this.data.filter((comment: any) => comment.id != id)
    },
    deleteCommentFailure(error: any) {
      this.isLoading = false
      this.error = error
    },
    async deleteComment(slug: string, id: number) {
      this.deleteCommentStart()
      try {
        await commentsApi.deleteComment(slug, id)
        this.deleteCommentSuccess(id)
      } catch (error: any) {
        this.deleteCommentFailure(error)
      }
    },
  },
})
