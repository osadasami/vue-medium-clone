import axios from '@/api/axios'

function getUserProfile(slug: string) {
  return axios.get(`/profiles/${slug}`).then((res) => res.data.profile)
}

function follow(username: string, isFollowing: boolean) {
  if (isFollowing) {
    return axios.delete(`/profiles/${username}/follow`)
  } else {
    return axios.post(`/profiles/${username}/follow`)
  }
}

export default {
  getUserProfile,
  follow,
}
