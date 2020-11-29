import { http_headers } from '@/infrastructure/axios-api'
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
        filtered = state.all.filter(animal => animal.status === 'AVAIL')
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
        type: formData.type
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
            commit('setAnimals', response.data)
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
            const payload = { id: itemId, ...response.data }
            commit('setCurrent', payload)
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
    updateAnimal(context, { id, name, status }) {
      const url = `${apiEndpoints.animals}${id}/`
      const bodyParams = {
        name,
        status
        // type
      }
      return new Promise((resolve, reject) => {
        http_headers
          .patch(url, bodyParams)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  }
}
