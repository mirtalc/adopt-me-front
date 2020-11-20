import { http_headers } from '../../infrastructure/axios-api'
import { apiEndpoints } from '../../constants/apiEndpoints'

export default {
  state: {
    all: []
  },
  getters: {
    availableAnimals(state) {
      console.log('stateeeeee', state)
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
            console.warn('Error trying to post data: ', error)
            reject(error)
          })
      })
    },
    fetchAnimals({ commit }) {
      return new Promise((resolve, reject) => {
        http_headers
          .get(apiEndpoints.animals)
          .then(response => {
            console.log('Axios has received data: ', response.data)
            commit('setAnimals', response.data)
            resolve(response)
          })
          .catch(error => {
            console.warn('Error trying to receive data: ', error)
            reject(error)
          })
      })
    }
  }
}
