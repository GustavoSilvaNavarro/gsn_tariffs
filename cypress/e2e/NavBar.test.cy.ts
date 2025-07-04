describe('NavBar Component test', () => {
  const ALL_UTILITY_URL = '/public/lses';
  const TARIFF_LIST_URL = '/public/tariffs';

  beforeEach(() => {
    cy.intercept('GET', `${ALL_UTILITY_URL}?pageStart=0&pageCount=10&**`, {
      fixture: 'utilities/utilityListTenItems.json',
    }).as('getListOf10Utilities');

    cy.intercept('GET', `${TARIFF_LIST_URL}?pageStart=0&pageCount=10&**`, {
      fixture: 'tariffs/tariffList10Items.json',
    }).as('getListOf10Tariffs');

    cy.visit('http://localhost:8080/');
  });

  it('Should have a home title', () => {
    cy.wait('@getListOf10Utilities');

    cy.get('[data-testid="cy-home-route"]').find('h3').should('exist').should('have.text', 'GSN');
    cy.get('[data-testid="cy-home-route"]').find('img').should('exist').should('be.visible');
    cy.get('[data-testid="cy-home-route"]').find('img').should('have.attr', 'alt', 'Logo');
  });

  it('Should have a utility section', () => {
    cy.wait('@getListOf10Utilities');

    cy.get('[data-testid="cy-utilities-route"]').should('have.attr', 'href', '/utilities');
    cy.get('[data-testid="cy-utilities-route"]').should('contain', 'Utilities');
    cy.get('[data-testid="cy-utilities-route"]').click();
    cy.url().should('include', '/utilities');
  });

  it('Should have a tariff router', () => {
    cy.wait('@getListOf10Utilities');

    cy.get('[data-testid="cy-tariffs-route"]').should('have.attr', 'href', '/tariffs');
    cy.get('[data-testid="cy-tariffs-route"]').should('contain', 'Tariffs');
    cy.get('[data-testid="cy-tariffs-route"]').click();

    cy.wait('@getListOf10Tariffs');
    cy.url().should('include', '/tariffs');
  });
});
