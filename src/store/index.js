import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import actions from './actions'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    accessToken: null,
    refreshToken: null,
    animals: ''
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
  getters: {
    isLogged(state) {
      return state.accessToken != null
    }
  },
  actions: actions
})
