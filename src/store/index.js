import Vue from 'vue'
import Vuex from 'vuex'
//TODO Removing this plugin was necessary in order for the
// ...module structured Vuex to work, but
// ...now we have to fix authentication loss when page is refreshed
// import createPersistedState from 'vuex-persistedstate'
import animals from './modules/animals'
import authentication from './modules/authentication'

Vue.use(Vuex)
export default new Vuex.Store({
  plugins: [
    // createPersistedState({
    //   storage: window.sessionStorage
    // })
  ],
  modules: {
    animals,
    authentication
  },
  state: {},
  mutations: {},
  getters: {},
  actions: {}
})
