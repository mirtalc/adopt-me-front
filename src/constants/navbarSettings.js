import { routesInfo } from '@/constants/routesInfo'

export const iconRelation = {
  [routesInfo.home.name]: 'logo.png',
  [routesInfo.logout.name]: 'icons/logout.png',
  [routesInfo.animalCreate.name]: 'icons/add-pet.png'
}

export const sectionsWithIcon = [
  routesInfo.home.name,
  routesInfo.animalCreate.name,
  routesInfo.logout.name
]

export const separatedSections = [
  routesInfo.logout.name,
  routesInfo.register.name
]
