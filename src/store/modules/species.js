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
    fetchAllSpecies({ commit }) {
      let url = apiEndpoints.species

      return new Promise((resolve, reject) => {
        http_headers
          .get(url)
          .then(response => {
            const assembledSpecies = assembleSpecies(response.data)
            commit('setSpecies', assembledSpecies)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
