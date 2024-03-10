const directorioName = __dirname.replaceAll("\\", "/");

const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module}`, () => {
  before(() => {
    cy.login(Cypress.env().usuario, Cypress.env().password);
    cy.visit("");
  });
  it("Deberia permitir al usuario editar un producto", () => {
    cy.get('[data-cy="onlineshoplink"]').click();
    cy.get('[data-cy="name"]')
      .eq(0)
      .should("be.visible")
      .invoke("text")
      .as("nombrePrimerProducto");
    cy.get('[data-cy="price"]').eq(0).invoke("text").as("precioPrimerProducto");

    cy.get('[data-cy^="add-to-cart-"]').eq(0).click();
    cy.get('[data-cy="closeModal"]').click();
    cy.get('[data-cy^="add-to-cart-"]').eq(0).click();
    cy.get('[data-cy="closeModal"]').click();

    cy.get('[data-cy="name"]')
      .eq(1)
      .should("be.visible")
      .invoke("text")
      .as("nombreSegundoProducto");
    cy.get('[data-cy="price"]')
      .eq(1)
      .invoke("text")
      .as("precioSegundoProducto");

    cy.get('[data-cy^="add-to-cart-"]').eq(1).click();
    cy.get('[data-cy="closeModal"]').click();

    cy.get('[data-cy="goShoppingCart"]').click();

    cy.get('[data-cy="productAmount"]')
      .eq(0)
      .invoke("text")
      .then((quantity) => {
        expect(parseInt(quantity)).to.be.equal(2);
      });
    cy.get('[data-cy="productName"]')
      .eq(0)
      .invoke("text")
      .then(function (producto) {
        expect(producto).to.be.equal(this.nombrePrimerProducto);
      });
    cy.get('[data-cy="unitPrice"]')
      .eq(0)
      .invoke("text")
      .then(function (precio) {
        expect(precio).to.be.equal(`$${this.precioPrimerProducto}`);
      });
    cy.get('[data-cy="totalPrice"]')
      .eq(0)
      .invoke("text")
      .then(function (precio) {
        expect(precio).to.be.equal(`$${2 * this.precioPrimerProducto}`);
      });



      cy.get('[data-cy="productAmount"]')
      .eq(1)
      .invoke("text")
      .then((quantity) => {
        expect(parseInt(quantity)).to.be.equal(1);
      });
    cy.get('[data-cy="productName"]')
      .eq(1)
      .invoke("text")
      .then(function (producto) {
        expect(producto).to.be.equal(this.nombreSegundoProducto);
      });
    cy.get('[data-cy="unitPrice"]')
      .eq(1)
      .invoke("text")
      .then(function (precio) {
        expect(precio).to.be.equal(`$${this.precioSegundoProducto}`);
      });
    cy.get('[data-cy="totalPrice"]')
      .eq(1)
      .invoke("text")
      .then(function (precio) {
        expect(precio).to.be.equal(`$${1 * this.precioSegundoProducto}`);
      });
   
  });
});
