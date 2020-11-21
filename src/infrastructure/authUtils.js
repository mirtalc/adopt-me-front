function factory() {
  return {
    setAccessToken(value) {
      return localStorage.setItem('accessToken', value)
    },
    setRefreshToken(value) {
      return localStorage.setItem('refreshToken', value)
    },
    setTokensLocalStorage(tokens) {
      return (
        this.setAccessToken(tokens.access), this.setRefreshToken(tokens.refresh)
      )
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
      return localStorage.getItem('accessToken')
    },
    getRefreshToken() {
      return localStorage.getItem('refreshToken')
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
