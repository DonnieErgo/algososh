import { SHORT_DELAY_IN_MS, DELAY_IN_MS } from '../../src/constants/delays';

describe('List page tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list')
  })

  it('submit button is disabled if input is empty', () => {
    cy.get('[data-cy="input"]').clear()
    cy.get('[data-cy="indexInput"]').clear()
    cy.get('[data-cy="addToHead"]').should('be.disabled')
    cy.get('[data-cy="addToTail"]').should('be.disabled')
    cy.get('[data-cy="addByIndex"]').should('be.disabled')
    cy.get('[data-cy="deleteByIndex"]').should('be.disabled')
    cy.get('[data-cy="deleteFromHead"]').should('not.be.disabled')
    cy.get('[data-cy="deleteFromTail"]').should('not.be.disabled')
  })

  it('render default list', () => {
    cy.get('[class*=circle_content]').as('circle-content')

    cy.get('@circle-content')
    .each((el, index) => {
      if (index === 0) {
        expect(el).to.contain('0')
        expect(el).to.contain('head')
      }
      if (index === 1) {
        expect(el).to.contain('34')
        expect(el).to.contain('1')
      }
      if (index === 2) {
        expect(el).to.contain('8')
        expect(el).to.contain('2')
      }
      if (index === 3) {
        expect(el).to.contain('1')
        expect(el).to.contain('tail')
        expect(el).to.contain('3')
      }
    })
  })

  it('add item to head', () => {
    cy.get('[data-cy="input"]').type('qwe')
    cy.get('[data-cy="addToHead"]').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('0')
          expect(el).to.contain('qwe')
          expect(el).to.contain('head')
        }
      })
  })

  it('add item to tail', () => {
    cy.get('[data-cy="input"]').type('qwe')
    cy.get('[data-cy="addToTail"]').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 4) {
          expect(el).to.contain('4')
          expect(el).to.contain('qwe')
          expect(el).to.contain('tail')
        }
      })
  })

  it('delete item from head', () => {
    cy.get('[data-cy="deleteFromHead"]').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('34')
          expect(el).to.contain('0')
          expect(el).to.contain('head')
        }
      })
  })

  it('delete item from tail', () => {
    cy.get('[data-cy="deleteFromTail"]').click()

    cy.wait(SHORT_DELAY_IN_MS)

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 3) {
          expect(el).not.to.contain('1')
          expect(el).not.to.contain('tail')
        }
      })
  })

  it('add item by index', () => {
    const testIndex = 2
    cy.get('[data-cy="input"]').type('qwe')
    cy.get('[data-cy="indexInput"]').type(testIndex)
    cy.get('[data-cy="addByIndex"]').click()

    cy.wait(DELAY_IN_MS * (testIndex + 1))

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 1) {
          expect(el).to.contain('34')
          expect(el).to.contain('1')
        }
        if (index === 2) {
          expect(el).to.contain('qwe')
          expect(el).to.contain('2')
        }
        if (index === 3) {
          expect(el).to.contain('8')
          expect(el).to.contain('3')
        }
      })
  })

  it('delete item by index', () => {
    const testIndex = 2
    cy.get('[data-cy="indexInput"]').type(testIndex)
    cy.get('[data-cy="deleteByIndex"]').click()

    cy.wait(DELAY_IN_MS * (testIndex + 1))

    cy.get('[class*=circle_content]')
      .each((el, index) => {
        if (index === 0) {
          expect(el).to.contain('0')
          expect(el).to.contain('head')
        }
        if (index === 1) {
          expect(el).to.contain('34')
          expect(el).to.contain('1')
        }
        if (index === 2) {
          expect(el).to.contain('1')
          expect(el).to.contain('2')
          expect(el).to.contain('tail')
        }
      })
  })
})