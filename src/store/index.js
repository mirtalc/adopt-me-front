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
    animals: []
  },
  mutations: {
    setAnimals(state, payload) {
      state.animals = payload
    },
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
    availableAnimals(state) {
      let filtered = []
      if (state.animals.length) {
        filtered = state.animals.filter(animal => animal.status === 'AVAIL')
      }
      return filtered
    },
    isLogged(state) {
      return state.accessToken != null
    }
  },
  actions: actions
})
