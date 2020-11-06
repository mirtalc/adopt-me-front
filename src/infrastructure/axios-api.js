import axios from 'axios'
// import authUtils from '../infrastructure/authentication'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 1000,
})

// const instance_headers = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   timeout: 1000,
//   headers: {
//     Authorization: authUtils.getBearerToken()
//   },
// })

export const http = instance

// export const http_headers = instance_headers