import axios from '@/api/axios'

function getComments(slug: string) {
  return axios
    .get(`/articles/${slug}/comments`)
    .then((res) => res.data.comments)
}

function createComment(slug: string, body: string) {
  return axios
    .post(`/articles/${slug}/comments`, {comment: {body}})
    .then((res) => res.data.comment)
}

function deleteComment(slug: string, id: number) {
  return axios.delete(`/articles/${slug}/comments/${id}`)
}

export default {
  getComments,
  createComment,
  deleteComment,
}
