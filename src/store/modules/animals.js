import { http_headers } from '../../infrastructure/axios-api'
import { apiEndpoints } from '../../constants/apiEndpoints'

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
      return new Promise((resolve, reject) => {
        http_headers
          .post(apiEndpoints.animals, {
            name: formData.name,
            status: formData.status,
            type: formData.type
          })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
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
          .catch(error => {
            reject(error)
          })
      })
    },
    fetchDetails({ commit }, itemId) {
      let url = `${apiEndpoints.animals}${itemId}/`
      return new Promise((resolve, reject) => {
        http_headers
          .get(url)
          .then(response => {
            commit('setCurrent', response.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    deleteAnimal(context, itemId) {
      let url = `${apiEndpoints.animals}${itemId}0/`
      return new Promise((resolve, reject) => {
        http_headers
          .delete(url)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }
  }
}
