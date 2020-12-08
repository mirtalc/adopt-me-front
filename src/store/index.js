import Vue from 'vue'
import Vuex from 'vuex'
import animals from '@/store/modules/animals'
import species from '@/store/modules/species'
import status from '@/store/modules/status'
import authentication from '@/store/modules/authentication'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [],
  modules: {
    animals,
    species,
    status,
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
  actions: {
    showToast(context, message) {
      Vue.$toast.warning(message)
    }
  }
})
