import { http_headers } from '@/infrastructure/axios-api'
import { apiEndpoints } from '@/constants/endpoints'
import { assembleAdoptionStatuses } from '@/infrastructure/assemblers'

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
    async fetchAllStatuses({ commit }) {
      const url = apiEndpoints.adoptionStatus
      const response = await http_headers.get(url)
      const assembledStatuses = assembleAdoptionStatuses(response.data)
      commit('setStatuses', assembledStatuses)
    }
  }
}
