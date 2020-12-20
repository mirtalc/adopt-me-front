import { http_headers } from '@/infrastructure/axios-api'
import {
  assembleAllAnimals,
  assembleCurrentAnimal,
  assembleAnimalBodyParams
} from '@/infrastructure/assemblers'
import { apiEndpoints } from '@/constants/endpoints'

export default {
  state: {
    all: [],
    current: []
  },
  getters: {
    availableAnimals(state) {
      let filtered = []
      if (state.all.length) {
        filtered = state.all.filter(animal => animal.status.uid === 'AVAIL')
      }
      return filtered
    }
  },
  mutations: {
    setAnimals(state, payload) {
      state.all = payload
    },
    setCurrent(state, payload) {
      state.current = payload
    },
    setCurrentToNull(state) {
      state.current = null
    }
  },
  actions: {
    async animalCreate({ rootGetters }, formData) {
      const bodyParams = assembleAnimalBodyParams(rootGetters, formData)
      await http_headers.post(apiEndpoints.animals, bodyParams)
    },
    async fetchAnimals({ commit }) {
      const response = await http_headers.get(apiEndpoints.animals)
      const assembledAnimals = assembleAllAnimals(response.data)
      commit('setAnimals', assembledAnimals)
    },
    async fetchDetails({ commit }, itemId) {
      const url = `${apiEndpoints.animals}${itemId}/`
      const response = await http_headers.get(url)
      const assembledCurrent = assembleCurrentAnimal({
        id: itemId,
        ...response.data
      })
      commit('setCurrent', assembledCurrent)
    },
    async deleteAnimal(context, itemId) {
      const url = `${apiEndpoints.animals}${itemId}/`
      await http_headers.delete(url)
    },
    async updateAnimal({ rootGetters }, payload) {
      const bodyParams = assembleAnimalBodyParams(rootGetters, payload)
      const url = `${apiEndpoints.animals}${payload.id}/`
      await http_headers.patch(url, bodyParams)
    },
    async updatePhoto(context, { itemId, formData }) {
      const url = `${apiEndpoints.animals}${itemId}/profilepic/`
      const headers = {
        'Content-Type': 'multipart/form-data'
      }
      await http_headers.patch(url, formData, {
        headers
      })
    }
  }
}
