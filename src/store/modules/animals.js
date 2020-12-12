import { http_headers } from '@/infrastructure/axios-api'
import {
  assembleAllAnimals,
  assembleCurrentAnimal,
  assembleAnimalBodyParams
} from '@/infrastructure/assemblers'
import { apiEndpoints } from '@/constants/apiEndpoints'

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
    animalCreate({ rootGetters }, formData) {
      const bodyParams = assembleAnimalBodyParams(rootGetters, formData)
      return new Promise((resolve, reject) => {
        http_headers
          .post(apiEndpoints.animals, bodyParams)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchAnimals({ commit }) {
      return new Promise((resolve, reject) => {
        http_headers
          .get(apiEndpoints.animals)
          .then(response => {
            const assembledAnimals = assembleAllAnimals(response.data)
            commit('setAnimals', assembledAnimals)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    fetchDetails({ commit }, itemId) {
      let url = `${apiEndpoints.animals}${itemId}/`
      return new Promise((resolve, reject) => {
        http_headers
          .get(url)
          .then(response => {
            const assembledCurrent = assembleCurrentAnimal({
              id: itemId,
              ...response.data
            })
            commit('setCurrent', assembledCurrent)
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    deleteAnimal(context, itemId) {
      const url = `${apiEndpoints.animals}${itemId}/`
      return new Promise((resolve, reject) => {
        http_headers
          .delete(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    updateAnimal({ rootGetters }, payload) {
      const bodyParams = assembleAnimalBodyParams(rootGetters, payload)
      const url = `${apiEndpoints.animals}${payload.id}/`
      return new Promise((resolve, reject) => {
        http_headers
          .patch(url, bodyParams)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  }
}
