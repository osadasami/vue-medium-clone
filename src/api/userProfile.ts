import axios from '@/api/axios'

function getUserProfile(slug: string) {
  return axios.get(`/profiles/${slug}`).then((res) => res.data.profile)
}

export default {
  getUserProfile,
}
