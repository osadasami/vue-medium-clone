import axios from '@/api/axios'

function getArticle(slug: string) {
  return axios.get(`/articles/${slug}`).then((res) => res.data.article)
}

function deleteArticle(slug: string) {
  return axios.delete(`/articles/${slug}`)
}

function createArticle(article: any) {
  return axios.post('/articles', {article}).then((res) => res.data.article)
}

export default {
  getArticle,
  deleteArticle,
  createArticle,
}
