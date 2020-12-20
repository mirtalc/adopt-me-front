import { http_headers } from '@/infrastructure/axios-api'
import { apiEndpoints } from '@/constants/endpoints'
import { assembleSpecies } from '@/infrastructure/assemblers'

export default {
  state: {
    all: []
  },
  getters: {
    getSpeciesByUid: (state, getters, rootState) => uid => {
      return rootState.species.all.find(sp => sp.uid === uid)
    }
  },
  mutations: {
    setSpecies(state, payload) {
      state.all = payload
    }
  },
  actions: {
    async fetchAllSpecies({ commit }) {
      const url = apiEndpoints.species
      const response = await http_headers.get(url)
      const assembledSpecies = assembleSpecies(response.data)
      commit('setSpecies', assembledSpecies)
    }
  }
}
