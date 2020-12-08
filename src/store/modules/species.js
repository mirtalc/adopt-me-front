// import { http_headers } from '@/infrastructure/axios-api'
// import { apiEndpoints } from '@/constants/apiEndpoints'

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
      //TODO
      const assembledSpecies = [
        { id: 1, name: 'Cat', uid: 'CAT' },
        { id: 2, name: 'Dog', uid: 'DOG' }
      ]
      commit('setSpecies', assembledSpecies)
    }
  }
}
