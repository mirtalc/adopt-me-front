import { apiEndpoints } from '@/constants/endpoints'
import router from '@/router'
import { routesInfo } from '@/constants/routesInfo'
import store from '@/store'

function redirectToLogin() {
  router.push({ name: routesInfo.login.name })
}

function redirectToGenericError() {
  router.push({ name: routesInfo.error.name })
}

function forceLogOut() {
  store.dispatch('userLogout')
  redirectToLogin()
}

function showExpiredSessionToast() {
  store.dispatch('showToast', 'Your session has expired. Please, log in again')
}

export function handleUnknownError(error) {
  console.log('Unknown Axios error: ', error)
  store.commit('setError', error)
  redirectToGenericError()
}

export function handleExpiredSessionError() {
  showExpiredSessionToast()
  forceLogOut()
}

export function isAuthorizationRelated(error) {
  return error.response ? error.response.status === 401 : false
}

export function isRefreshTokenRelated(error) {
  return error.config.url === apiEndpoints.refresh
}
