import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('String page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion')
  })

  it('button is disabled if input is empty', () => {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  })

  it('string reverse algorithm and animations work correctly', () => {
    cy.get('[data-cy="input"]').type('examp')
    cy.get('[data-cy="submit"]').click()

    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 5)
      .each((el, index) => {
        if (index === 0) expect(el).to.contain('e')
        if (index === 1) expect(el).to.contain('x')
        if (index === 2) expect(el).to.contain('a')
        if (index === 3) expect(el).to.contain('m')
        if (index === 4) expect(el).to.contain('p')

        if (index === 0 || index === 4) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
        }
      })

      cy.wait(SHORT_DELAY_IN_MS)
    
      cy.get('@circle').each((el, index) => {
        if (index === 0 || index === 4) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
        }
      })

      cy.wait(SHORT_DELAY_IN_MS)

      cy.get('@circle').each((el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')
          
          if (index === 1) expect(el).to.contain('x')
          if (index === 3) expect(el).to.contain('m')
        }
      })

      cy.wait(SHORT_DELAY_IN_MS)

      cy.get('@circle').each((el, index) => {
        if (index === 1 || index === 3) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
          
          if (index === 1) expect(el).to.contain('m')
          if (index === 3) expect(el).to.contain('x')
        }
      })

      cy.wait(SHORT_DELAY_IN_MS)

      cy.get('@circle').each((el, index) => {
        if (index === 2) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(210, 82, 225)')  
          expect(el).to.contain('a')
        }
      })

      cy.wait(SHORT_DELAY_IN_MS)
      
      cy.get('@circle').each((el, index) => {
        if (index === 2) {
          cy.wrap(el).should('have.css', 'border', '4px solid rgb(127, 224, 81)')
          expect(el).to.contain('a')
        }
      })

      cy.get('[data-cy="input"]').should('have.value', '')
      cy.get('[data-cy="submit"]').should('be.disabled')
  })
})