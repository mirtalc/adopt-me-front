import Vue from 'vue'
import VueRouter from 'vue-router'
import IdleVue from 'idle-vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { routesInfo } from '@/constants/routesInfo'
import '@/assets/styles'

const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 6000000000
})
Vue.use(VueRouter)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    !store.getters.isLogged ? next({ name: routesInfo.login.name }) : next()
  } else next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
