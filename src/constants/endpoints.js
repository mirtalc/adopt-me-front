const backendServer = `${process.env.VUE_APP_BACKEND_ROOT}`
const mediaServer = `${process.env.VUE_APP_MEDIA_ROOT}`

export const apiEndpoints = {
  animals: 'animals/',
  login: 'token/',
  refresh: 'token-refresh/',
  register: 'register/',
  vaccines: 'vaccines/',
  species: 'species/',
  adoptionStatus: 'adoption-statuses/'
}

export const mediaEndpoints = {
  pets: 'pets/'
}

export const fullMediaEndpoints = {
  mediaServer: () => mediaServer,
  animals: () => `${mediaServer}${mediaEndpoints.pets}`
}

//REVIEW: maybe this is unnecessary
export const fullApiEndpoints = {
  backendServer: () => backendServer,
  animals: () => `${backendServer}${apiEndpoints.animals}`,
  login: () => `${backendServer}${apiEndpoints.login}`,
  register: () => `${backendServer}${apiEndpoints.register}`,
  vaccines: () => `${backendServer}${apiEndpoints.vaccines}`
}
