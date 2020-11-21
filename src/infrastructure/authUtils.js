function factory() {
  return {
    setAccessToken(value) {
      console.log('setAccessToken: ', value)
      return localStorage.setItem('accessToken', value)
    },
    setRefreshToken(value) {
      return localStorage.setItem('refreshToken', value)
    },
    deleteAccessToken() {
      return localStorage.removeItem('accessToken', null)
    },
    deleteRefreshToken() {
      return localStorage.removeItem('refreshToken', null)
    },
    deleteTokens() {
      return this.deleteAccessToken(), this.deleteRefreshToken()
    },
    getAccessToken() {
      console.log(
        'getAccessToken from localstorage: ',
        localStorage.getItem('accessToken')
      )
      return localStorage.getItem('accessToken')
    },
    getRefreshToken() {
      console.log(
        'getRefreshToken from localstorage: ',
        localStorage.getItem('refreshToken')
      )
      return localStorage.getItem('accessToken')
    },
    getBearerToken() {
      return `Bearer ${this.getAccessToken()}`
    },
    isAuthenticated() {
      console.log('isAuthenticated executed')
      return !!this.getAccessToken()
    }
  }
}

export default factory()
