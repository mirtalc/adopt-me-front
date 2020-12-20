import axios from 'axios'
import authUtils from '@/infrastructure/authUtils'
import { fullApiEndpoints } from '@/constants/endpoints'
import store from '@/store'
import {
  isAuthorizationRelated,
  isRefreshTokenRelated,
  handleUnknownError,
  handleExpiredSessionError
} from '@/infrastructure/axios-helpers'

const axios_instance = axios.create({
  baseURL: fullApiEndpoints.backendServer(),
  timeout: 1000
})

const axios_instance_with_headers = axios.create({
  baseURL: fullApiEndpoints.backendServer(),
  timeout: 1000
})

axios_instance_with_headers.interceptors.request.use(config => {
  const token = authUtils.getBearerToken()
  config.headers.Authorization = token
  return config
})

axios_instance_with_headers.interceptors.response.use(
  response => response,
  error => {
    if (isRefreshTokenRelated(error)) {
      handleExpiredSessionError()
      return new Promise((resolve, reject) => reject(error))
    }

    if (!isAuthorizationRelated(error)) {
      handleUnknownError(error)
      return new Promise((resolve, reject) => reject(error))
    }

    // Use refresh token to obtain new Access Token and repeat the petition with the new header
    return store
      .dispatch('renewTokens')
      .then(() => {
        const config = error.config
        config.headers.Authorization = authUtils.getBearerToken()

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then(response => resolve(response))
            .catch(error => reject(error))
        })
      })
      .catch(error => Promise.reject(error))
  }
)

export const http = axios_instance
export const http_headers = axios_instance_with_headers
