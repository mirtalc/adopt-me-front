import { http_headers } from '@/infrastructure/axios-api'
import {
  assembleAllAnimals,
  assembleCurrentAnimal
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
    }
  },
  actions: {
    animalCreate(context, formData) {
      const bodyParams = {
        name: formData.name,
        status: formData.status,
        species: formData.species
      }
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
    updateAnimal({ rootGetters }, { id, name, speciesUid, statusUid }) {
      const speciesId = rootGetters.getSpeciesByUid(speciesUid).id
      const statusId = rootGetters.getStatusByUid(statusUid).id

      const bodyParams = {
        id,
        name,
        species: speciesId,
        status: statusId
      }
      const url = `${apiEndpoints.animals}${id}/`
      return new Promise((resolve, reject) => {
        http_headers
          .patch(url, bodyParams)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  }
}
