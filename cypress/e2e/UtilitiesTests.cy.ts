describe('Test Utilities route with its components', () => {
  const ALL_UTILITY_URL = '/public/lses';

  beforeEach(() => {
    cy.intercept('GET', `${ALL_UTILITY_URL}?pageStart=0&pageCount=10&**`, {
      fixture: 'utilities/utilityListTenItems.json',
    }).as('getListOf10Utilities');

    cy.visit('http://localhost:8080/');
  });

  it('Should visit /utilities endpoint and display all utilities information', () => {
    cy.wait('@getListOf10Utilities');

    cy.get('[data-testid="cy-utilities-title"]').should('exist').should('have.text', 'List of Utilities');
  });

  it('Should render the default 10 rows for the utilities info inside the table', () => {
    cy.wait('@getListOf10Utilities');

    cy.get('[data-testid="cy-utilities-table-data"]')
      .find('tbody')
      .find('tr[data-testid^="cy-row-"]')
      .should('have.length', 10);
  });

  it('Should render 25 rows of utility data when hitting the rows per page', () => {
    cy.wait('@getListOf10Utilities');

    cy.intercept('GET', `${ALL_UTILITY_URL}?pageStart=0&pageCount=25&**`, {
      fixture: 'utilities/utilityList25Items.json',
    }).as('getListOf25Utilities');

    cy.get('[data-testid="cy-utilities-pagination"]')
      .find('[role="combobox"][aria-haspopup="listbox"]')
      .should('be.visible')
      .click();

    cy.get('li[role="option"]').contains('25').click();

    cy.wait('@getListOf25Utilities');

    cy.get('[data-testid="cy-utilities-table-data"]')
      .find('tbody')
      .find('tr[data-testid^="cy-row-"]')
      .should('have.length', 25);
  });
});
