import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

const checkDefaultCircleStyle = (el) => {
  cy.get(el).find('[class*=circle_circle]')
    .should('have.css', 'border', '4px solid rgb(0, 50, 255)')
}

const checkChangingCircleStyle = (el) => {
  cy.get(el).find('[class*=circle_circle]').
    should('have.css', 'border', '4px solid rgb(210, 82, 225)')
}

describe('Queue page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue')
  })

  it('submit button is disabled if input is empty', () => {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="submit"]').should('be.disabled')
  })

  it('adding items to queue', () => {
    cy.get('[data-cy="input"]').as('input')
    cy.get('[data-cy="submit"]').as('submit')

    cy.get('@input').type('qwe')
    cy.get('@submit').click()

    cy.get('[class*=circle_content]').as('circle-content')

    cy.get('@circle-content')
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('qwe')
          expect(el).to.contain('head')
          expect(el).to.contain('tail')
          expect(el).to.contain('0')
          checkChangingCircleStyle(el)
        }
      })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@input').type('rty')
    cy.get('@submit').click()

    cy.get('@circle-content')
    .each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('qwe')
        expect(el).to.contain('head')
        checkDefaultCircleStyle(el)
      }
      if (index === 1) {
        expect(el).to.contain('rty')
        expect(el).to.contain('tail')
        checkChangingCircleStyle(el)
      }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@circle-content')
    .each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('qwe')
        expect(el).to.contain('head')
        checkDefaultCircleStyle(el)
      }
      if (index === 1) {
        expect(el).to.contain('rty')
        expect(el).to.contain('tail')
        checkDefaultCircleStyle(el)
      }
    })

    cy.get('[data-cy="submit"]').should('be.disabled')
    cy.get('[data-cy="delete"]').should('not.be.disabled')
    cy.get('[data-cy="clear"]').should('not.be.disabled')
  })

  it('delete items from queue', () => {
    cy.get('[data-cy="input"]').as('input')
    cy.get('[data-cy="submit"]').as('submit')
    cy.get('[data-cy="delete"]').as('delete')

    cy.get('@input').type('qwe')
    cy.get('@submit').click()
    cy.get('@input').type('rty')
    cy.get('@submit').click()

    cy.get('[class*=circle_content]').as('circle-content')

    cy.get('@delete').click()

    cy.get('@circle-content')
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('')
        }

        if (index === 1) {
          expect(el).to.contain('rty')
          expect(el).to.contain('tail')
        }
    })

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('@delete').click()

    cy.get('@circle-content').each(el => expect(el).to.contain(''))

    cy.get('[data-cy="submit"]').should('be.disabled')
    cy.get('[data-cy="delete"]').should('be.disabled')
    cy.get('[data-cy="clear"]').should('be.disabled')
  })

  it('clearing items from queue', () => {
    cy.get('[data-cy="input"]').as('input')
    cy.get('[data-cy="submit"]').as('submit')
    cy.get('[data-cy="clear"]').as('clear')

    cy.get('@input').type('qwe')
    cy.get('@submit').click()
    cy.get('@input').type('rty')
    cy.get('@submit').click()
    cy.get('@input').type('test')
    cy.get('@submit').click()

    cy.get('@clear').click()
    cy.get('[class*=circle_content]').each(el => expect(el).to.contain(''))

    cy.get('@submit').should('be.disabled')
    cy.get('[data-cy="delete"]').should('be.disabled')
    cy.get('@clear').should('be.disabled')
  })

})