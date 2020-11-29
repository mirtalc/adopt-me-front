import Vue from 'vue'
import Vuex from 'vuex'
import animals from '@/store/modules/animals'
import authentication from '@/store/modules/authentication'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [],
  modules: {
    animals,
    authentication
  },
  state: {
    lastError: null
  },
  mutations: {
    setError(state, payload) {
      state.lastError = payload
    }
  },
  getters: {},
  actions: {}
})
