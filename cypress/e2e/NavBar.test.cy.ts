describe('NavBar Component test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('Should have a home title', () => {
    cy.get('[data-testid="cy-home-route"]').find('h3').should('exist').should('have.text', 'GSN');
    cy.get('[data-testid="cy-home-route"]').find('img').should('exist').should('be.visible');
    cy.get('[data-testid="cy-home-route"]').find('img').should('have.attr', 'alt', 'Logo');
  });

  it('Should have a utility section', () => {
    cy.get('[data-testid="cy-utilities-route"]').should('have.attr', 'href', '/utilities');
    cy.get('[data-testid="cy-utilities-route"]').should('contain', 'Utilities');
    cy.get('[data-testid="cy-utilities-route"]').click();
    cy.url().should('include', '/utilities');
  });

  it('Should have a tariff router', () => {
    cy.get('[data-testid="cy-tariffs-route"]').should('have.attr', 'href', '/tariffs');
    cy.get('[data-testid="cy-tariffs-route"]').should('contain', 'Tariffs');
    cy.get('[data-testid="cy-tariffs-route"]').click();
    cy.url().should('include', '/tariffs');
  });
});
