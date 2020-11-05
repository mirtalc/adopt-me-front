import VueRouter from 'vue-router'
import Animals from './views/Animals'
import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'
import Register from './views/Register'
import { routesInfo } from './constants/routesInfo'

const routes = [
  {
    path: routesInfo.home.path,
    name: routesInfo.home.name,
    component: Home
  },
  {
    path: routesInfo.animals.path,
    name: routesInfo.animals.name,
    component: Animals,
    meta: {
      requiresLogin: true
    }
  },
  {
    path: routesInfo.login.path,
    name: routesInfo.login.name,
    component: Login
  },
  {
    path: routesInfo.logout.path,
    name: routesInfo.logout.name,
    component: Logout
  },
  {
    path: routesInfo.register.path,
    name: routesInfo.register.name,
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
