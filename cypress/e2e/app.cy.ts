/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('input[name="location"]').type('Telford')

    cy.get('ul.locations').contains('Telford')

    // Find a link with an href attribute containing "about" and click it
    cy.get('li[data*="Telford"]').click()

    // cy.get('ul.locations').not('li')

    // // The new url should include "/about"
    // cy.url().should('include', '/about')

    // // The new page should contain an h1 with "About page"
    // cy.get('h1').contains('About Page')
  })
})

// Prevent TypeScript from reading file as legacy script
export {}
