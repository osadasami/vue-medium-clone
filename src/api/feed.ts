import axios from '@/api/axios'

function getFeed(url: string) {
  return axios.get(url)
}

export default {
  getFeed,
}
