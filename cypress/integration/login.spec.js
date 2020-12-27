describe('Login', () => {
  it('Creating a New Post', () => {
    cy.visit('/login')

    // fill user field
    cy.get('input[name=username]')
      .clear()
      .type('mirta')

    // fill password
    cy.get('input[name=password]')
      .clear()
      .type('0')

    // press login button
    cy.get('button[type=submit]').click()

    // check redirection after successful login
    cy.location('pathname').should(pathname => expect(pathname).to.eq('/'))

    // check that view loaded is, in fact, the Home view
    cy.get('.title').should($title => {
      expect($title).to.exist
      expect($title).to.contain('Available for adoption pets')
    })
  })
})
