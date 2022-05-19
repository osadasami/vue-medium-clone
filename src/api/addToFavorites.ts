import axios from '@/api/axios'

function toggleFavorites(slug: string, isFavorited: boolean) {
  if (isFavorited) {
    return axios
      .delete(`/articles/${slug}/favorite`)
      .then((res) => res.data.article)
  } else {
    return axios
      .post(`/articles/${slug}/favorite`)
      .then((res) => res.data.article)
  }
}

export default {
  toggleFavorites,
}
