import { http, http_headers } from '@/infrastructure/axios-api'
import authUtils from '@/infrastructure/authUtils'
import { apiEndpoints } from '@/constants/apiEndpoints'

export default {
  state: () => ({
    accessToken: authUtils.getAccessToken(),
    refreshToken: authUtils.getRefreshToken()
  }),
  getters: {
    isLogged(state) {
      return state.accessToken != null
    }
  },
  mutations: {
    setTokens(state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
    },
    deleteTokens(state) {
      state.accessToken = null
      state.refreshToken = null
    },
    setAccessToken(state, access) {
      state.accessToken = access
    }
  },
  actions: {
    userLogin(context, credentials) {
      return new Promise((resolve, reject) => {
        http
          .post(apiEndpoints.login, {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            const tokens = {
              access: response.data.access,
              refresh: response.data.refresh
            }
            context.commit('setTokens', tokens)
            authUtils.setTokensLocalStorage(tokens)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    userLogout(context) {
      if (context.getters.isLogged) {
        context.commit('deleteTokens')
      }
      authUtils.deleteTokens()
    },
    userRegister(context, credentials) {
      return new Promise((resolve, reject) => {
        http
          .post(apiEndpoints.register, {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    renewTokens(context) {
      return new Promise((resolve, reject) => {
        const refreshToken = authUtils.getRefreshToken()
        http_headers
          .post(apiEndpoints.refresh, {
            refresh: refreshToken
          })
          .then(response => {
            context.commit('setAccessToken', response.data.access)
            authUtils.setAccessToken(response.data.access)
            resolve(response.data.access)
          })
          .catch(error => reject(error))
      })
    }
  }
}
