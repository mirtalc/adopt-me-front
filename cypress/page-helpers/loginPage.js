export const navigate = () => {
  cy.visit('/login')
}

export const fillField = (fieldName, fieldValue) => {
  cy.get(`input[name=${fieldName}]`)
    .clear()
    .type(fieldValue)
}

export const submit = () => {
  cy.get('button[type=submit]').click()
}
