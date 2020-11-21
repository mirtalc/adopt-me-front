import axios from 'axios'
import authUtils from './authUtils'
import { fullApiEndpoints } from '../constants/apiEndpoints'

const instance = axios.create({
  baseURL: fullApiEndpoints.backendServer(),
  timeout: 1000
})

const instance_headers = axios.create({
  baseURL: fullApiEndpoints.backendServer(),
  timeout: 1000
})

instance_headers.interceptors.request.use(config => {
  const token = authUtils.getBearerToken()
  config.headers.Authorization = token
  return config
})

export const http = instance
export const http_headers = instance_headers
