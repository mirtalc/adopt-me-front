import { http, http_headers } from '../infrastructure/axios-api'
import { apiEndpoints } from '../constants/apiEndpoints'

export default {
  userLogin(context, credentials) {
    return new Promise((resolve, reject) => {
      http
        .post(apiEndpoints.login, {
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          context.commit('setTokens', {
            access: response.data.access,
            refresh: response.data.refresh
          })
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  userLogout(context) {
    if (context.getters.isLogged) {
      context.commit('deleteTokens')
    }
  },
  userRegister(context, credentials) {
    return new Promise((resolve, reject) => {
      http
        .post(apiEndpoints.register, {
          username: credentials.username,
          password: credentials.password
        })
        .then(response => {
          console.log('register OK response: ', response)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
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
