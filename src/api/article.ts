import axios from '@/api/axios'

function getArticle(slug: string) {
  return axios.get(`/articles/${slug}`).then((res) => res.data.article)
}

export default {
  getArticle,
}
