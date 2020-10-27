import Vue from 'vue'
import Vuex from 'vuex'
import { getAPI } from './axios-api'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        accessToken: null,
        refreshToken: null,
        APIData: '',
    },
    mutations: {
        updateStorage(state, { access, refresh }) {
            state.accessToken = access
            state.refreshToken = refresh
        }
    },
    getters: {
        isLogged(state){
            return state.accessToken != null
        }
    },
    actions: {
        userLogin(context, credentials) {
            return new Promise((resolve, reject) => {
                getAPI.post('/token/', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(response => {
                    context.commit('updateStorage', {
                        access: response.data.access,
                        refresh: response.data.refresh
                    })
                    resolve('done')
                })
                .catch(error => {
                    reject(error)
                })
            })
        }
    }
})