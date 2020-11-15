import VueRouter from 'vue-router'
import Animals from './views/Animals'
import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'
import Register from './views/Register'
import AnimalCreate from './views/AnimalCreate'
import NotFound from './views/errors/NotFound'
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
  {
    path: routesInfo.animalCreate.path,
    name: routesInfo.animalCreate.name,
    component: AnimalCreate
  },
  { path: '*', component: NotFound }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
