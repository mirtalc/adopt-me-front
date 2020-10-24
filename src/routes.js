import Vue from 'vue'
import VueRouter from 'vue-router'
import Animals from './views/Animals'

// Add vue-router to our middleware
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'animals',
            component: Animals
        }
    ]
})