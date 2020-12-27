import * as LoginPage from '../page-helpers/loginPage.js'

describe('Login', () => {
  let goodUserData, badUserData

  before(() => {
    cy.fixture('user/good-credentials').then(user => {
      goodUserData = user
    })
    cy.fixture('user/bad-credentials').then(user => {
      badUserData = user
    })
  })

  beforeEach(() => {
    LoginPage.navigate()
  })

  it('Successful login', () => {
    const { username, password } = goodUserData

    LoginPage.fillField('username', username)
    LoginPage.fillField('password', password)
    LoginPage.submit()

    cy.location('pathname').should(pathname => expect(pathname).to.eq('/'))
    cy.get('.title').should($title => {
      expect($title).to.exist
      expect($title).to.contain('Available for adoption pets')
    })
  })

  it('Failed login (incorrect credentials)', () => {
    const { username, password } = badUserData

    LoginPage.fillField('username', username)
    LoginPage.fillField('password', password)
    LoginPage.submit()

    cy.location('pathname').should(pathname => expect(pathname).to.eq('/login'))
    cy.contains('Error: Incorrect user or password').should.exist
  })
})
