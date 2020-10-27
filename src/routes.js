import Vue from 'vue'
import VueRouter from 'vue-router'
import Animals from './views/Animals'
import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'

// Add vue-router to our middleware
Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/animals',
            name: 'animals',
            component: Animals,
            meta: {
                requiresLogin: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/logout',
            name: 'logout',
            component: Logout
        },
    ]
})