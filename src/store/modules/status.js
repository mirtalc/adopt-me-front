// import { http_headers } from '@/infrastructure/axios-api'
// import { apiEndpoints } from '@/constants/endpoints'

export default {
  state: {
    all: []
  },
  getters: {
    getStatusByUid: (state, getters, rootState) => uid => {
      return rootState.status.all.find(stat => stat.uid === uid)
    }
  },
  mutations: {
    setStatuses(state, payload) {
      state.all = payload
    }
  },
  actions: {
    fetchAllStatuses({ commit }) {
      //TODO
      const assembledSpecies = [
        { id: 1, name: 'Processing', uid: 'PROC' },
        { id: 2, name: 'Available', uid: 'AVAIL' },
        { id: 3, name: 'Adopted', uid: 'ADOP' },
        { id: 4, name: 'Transferred', uid: 'TRANS' },
        { id: 5, name: 'Deceased', uid: 'RIP' }
      ]
      commit('setStatuses', assembledSpecies)
    }
  }
}
