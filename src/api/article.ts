import axios from '@/api/axios'
import type {Article} from '@/types'

function getArticle(slug: string) {
  return axios.get(`/articles/${slug}`).then((res) => res.data.article)
}

function deleteArticle(slug: string) {
  return axios.delete(`/articles/${slug}`)
}

function createArticle(article: Article) {
  return axios.post('/articles', {article}).then((res) => res.data.article)
}

function updateArticle(slug: string, article: Article) {
  return axios
    .put(`/articles/${slug}`, {article})
    .then((res) => res.data.article)
}

export default {
  getArticle,
  deleteArticle,
  createArticle,
  updateArticle,
}
