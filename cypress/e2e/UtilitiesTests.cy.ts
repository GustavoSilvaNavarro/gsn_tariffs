describe('Test Utilities route with its components', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('Should visit /utilities endpoint and display all utilities information', () => {
    cy.get('[data-testid="cy-utilities-title"]').should('exist').should('have.text', 'List of Utilities');
  });

  it('Should render the default 10 rows for the utilities info inside the table', () => {
    cy.get('[data-testid="cy-utilities-table-data"]')
      .find('tbody')
      .find('tr[data-testid^="cy-row-"]')
      .should('have.length', 10);
  });

  it('Should render 25 rows of utility data when hitting the rows per page', () => {
    cy.get('[data-testid="cy-utilities-pagination"]')
      .find('[role="combobox"][aria-haspopup="listbox"]')
      .should('be.visible')
      .click();

    cy.get('li[role="option"]').contains('25').click();

    cy.get('[data-testid="cy-utilities-table-data"]')
      .find('tbody')
      .find('tr[data-testid^="cy-row-"]')
      .should('have.length', 25);
  });
});
