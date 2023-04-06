describe('Pages availability tests', () => {

  it('open main page', () => {
    cy.visit('http://localhost:3000')
  })

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('open recursion page', () => {
    cy.get('a[href*="recursion"]').click()
    cy.contains('String')
  })

  it('open fibonacci page', () => {
    cy.get('a[href*="fibonacci"]').click()
    cy.contains('Fibonacci Sequence')
  })

  it('open sorting page', () => {
    cy.get('a[href*="sorting"]').click()
    cy.contains('Array sorting')
  })

  it('open stack page', () => {
    cy.get('a[href*="stack"]').click()
    cy.contains('Stack')
  })

  it('open queue page', () => {
    cy.get('a[href*="queue"]').click()
    cy.contains('Queue')
  })

  it('open list page', () => {
    cy.get('a[href*="list"]').click()
    cy.contains('Linked list')
  })
})
