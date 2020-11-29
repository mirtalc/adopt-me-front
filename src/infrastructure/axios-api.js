import axios from 'axios'
import authUtils from '@/infrastructure/authUtils'
import router from '@/router'
import { fullApiEndpoints, apiEndpoints } from '@/constants/apiEndpoints'
import { routesInfo } from '@/constants/routesInfo'
import store from '@/store'

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

instance_headers.interceptors.response.use(
  response => response,
  error => {
    if (isRefreshTokenRelated(error)) {
      alert('Sorry, your session has expired. Please, log in again')
      forceLogOut()
      return new Promise((resolve, reject) => reject(error))
    }

    if (!isAuthorizationRelated(error)) {
      processUnknownError(error)
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

function isAuthorizationRelated(error) {
  return error.response.status === 401
}

function isRefreshTokenRelated(error) {
  return error.config.url === apiEndpoints.refresh
}

function redirectToLogin() {
  router.push({ name: routesInfo.login.name })
}

function processUnknownError(error) {
  console.log('Unknown Axios error: ', error)
  console.log(error)
  store.commit('setError', error)
  redirectToGenericError()
}

function redirectToGenericError() {
  router.push({ name: routesInfo.error.name })
}

function forceLogOut() {
  store.dispatch('userLogout')
  redirectToLogin()
}

export const http = instance
export const http_headers = instance_headers
