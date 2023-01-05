import {getItem} from '@/helpers/localStorage'
import axios from 'axios'

axios.defaults.baseURL = 'https://api.realworld.io/api'

axios.interceptors.request.use((config) => {
  const token = getItem('token')
  const tokenHeader = token ? `Token ${token}` : ''
  config.headers = config.headers || {}
  config.headers.Authorization = tokenHeader
  return config
})

export default axios
