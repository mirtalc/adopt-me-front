import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getAPI } from './axios-api'

Vue.use(Vuex)
export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ],
    state: {
        accessToken: null,
        refreshToken: null,
        APIData: '',
    },
    mutations: {
        setTokens(state, { access, refresh }) {
            state.accessToken = access
            state.refreshToken = refresh
        },
        deleteTokens(state){
            state.accessToken = null
            state.refreshToken = null
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
                    context.commit('setTokens', {
                        access: response.data.access,
                        refresh: response.data.refresh
                    })
                    resolve('done')
                })
                .catch(error => {
                    reject(error)
                })
            })
        },
        userLogout(context){
            if(context.getters.isLogged){
                context.commit('deleteTokens')
            }
        }
    }
})