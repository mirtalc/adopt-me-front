//TODO replace with environmental variables, like:
// const backendServer = `${process.env.BACKEND_ROOT}`
const backendServer = 'http://127.0.0.1:8000/api/'
export const apiEndpoints = {
    animals: 'animals/',
    login: 'token/',
    register: 'register/',
    vaccines: 'vaccines/',
}

//REVIEW: maybe this is unnecessary
export const fullApiEndpoints = {
    backendServer: () => backendServer,
    animals: () => `${backendServer}${apiEndpoints.animals}`,
    login: () => `${backendServer}${apiEndpoints.login}`,
    register: () => `${backendServer}${apiEndpoints.register}`,
    vaccines: () => `${backendServer}${apiEndpoints.vaccines}`,
}
