import axios from '@/api/axios'

function getTags() {
  return axios.get('/tags')
}

export default {
  getTags,
}
