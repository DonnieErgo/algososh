import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Fibonacci page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci')
  })

  it('button is disabled if input is empty', () => {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  })

  it('fibonacci sequence generates correctly', () => {
    cy.get('[data-cy="input"]').type('6')
    cy.get('[data-cy="submit"]').click()

    cy.get('[class*=circle_circle]').as('circle')

    cy.get('@circle').should('have.length', 1)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 2)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 3)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 4)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 5)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
        if (index === 4) expect(el).to.contain('5')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 6)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
        if (index === 4) expect(el).to.contain('5')
        if (index === 5) expect(el).to.contain('8')
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle').should('have.length', 7)
    .each((el, index) => {
        if (index === 0) expect(el).to.contain('1')
        if (index === 1) expect(el).to.contain('1')
        if (index === 2) expect(el).to.contain('2')
        if (index === 3) expect(el).to.contain('3')
        if (index === 4) expect(el).to.contain('5')
        if (index === 5) expect(el).to.contain('8')
        if (index === 6) expect(el).to.contain('13')
    })

    cy.get('[data-cy="input"]').should('have.value', '0')
    cy.get('[data-cy="submit"]').should('be.disabled')
  })
})