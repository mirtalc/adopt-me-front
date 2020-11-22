import VueRouter from 'vue-router'
import { routesInfo } from './constants/routesInfo'

const routes = [
  {
    path: routesInfo.home.path,
    name: routesInfo.home.name,
    component: () => import('./views/Home'),
    meta: {
      requiresLogin: true
    }
  },
  {
    path: routesInfo.animals.path,
    name: routesInfo.animals.name,
    component: () => import('./views/Animals'),
    meta: {
      requiresLogin: true
    }
  },
  {
    path: routesInfo.login.path,
    name: routesInfo.login.name,
    component: () => import('./views/Login')
  },
  {
    path: routesInfo.logout.path,
    name: routesInfo.logout.name,
    component: () => import('./views/Logout')
  },
  {
    path: routesInfo.register.path,
    name: routesInfo.register.name,
    component: () => import('./views/Register')
  },
  {
    path: routesInfo.animalCreate.path,
    name: routesInfo.animalCreate.name,
    component: () => import('./views/AnimalCreate')
  },
  {
    path: routesInfo.animalDetail.path,
    name: routesInfo.animalDetail.name,
    component: () => import('./views/AnimalDetail')
  },
  {
    path: routesInfo.error.path,
    name: routesInfo.error.name,
    component: () => import('./views/errors/GenericError')
  },
  { path: '*', component: () => import('./views/errors/NotFound') }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
