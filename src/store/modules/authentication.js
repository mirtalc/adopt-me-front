import { http } from '../../infrastructure/axios-api'
import { apiEndpoints } from '../../constants/apiEndpoints'

export default {
  state: {
    accessToken: null,
    refreshToken: null
  },
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
            context.commit('setTokens', {
              access: response.data.access,
              refresh: response.data.refresh
            })
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
    },
    userRegister(context, credentials) {
      return new Promise((resolve, reject) => {
        http
          .post(apiEndpoints.register, {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            console.log('register OK response: ', response)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
