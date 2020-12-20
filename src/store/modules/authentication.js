import { http, http_headers } from '@/infrastructure/axios-api'
import authUtils from '@/infrastructure/authUtils'
import { apiEndpoints } from '@/constants/endpoints'

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
    async userLogin(context, credentials) {
      const response = await http.post(apiEndpoints.login, {
        username: credentials.username,
        password: credentials.password
      })
      const tokens = {
        access: response.data.access,
        refresh: response.data.refresh
      }
      context.commit('setTokens', tokens)
      authUtils.setTokensLocalStorage(tokens)
    },
    userLogout(context) {
      if (context.getters.isLogged) {
        context.commit('deleteTokens')
      }
      authUtils.deleteTokens()
    },
    async userRegister(context, credentials) {
      await http.post(apiEndpoints.register, {
        username: credentials.username,
        password: credentials.password
      })
    },
    async renewTokens(context) {
      const refreshToken = authUtils.getRefreshToken()
      const response = await http_headers.post(apiEndpoints.refresh, {
        refresh: refreshToken
      })
      context.commit('setAccessToken', response.data.access)
      authUtils.setAccessToken(response.data.access)
    }
  }
}
