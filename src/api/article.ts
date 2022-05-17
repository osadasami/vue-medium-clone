import axios from '@/api/axios'

function getArticle(slug: string) {
  return axios.get(`/articles/${slug}`).then((res) => res.data.article)
}

function deleteArticle(slug: string) {
  return axios.delete(`/articles/${slug}`)
}

export default {
  getArticle,
  deleteArticle,
}
