const directorioName = __dirname.replaceAll("\\", "/");
const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
  before(() => {
    cy.login(Cypress.env().usuario, Cypress.env().password);
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as("data");
    cy.then(function () {
      cy.GetProductByName(this.data.product1.name).as("response1");
      cy.GetProductByName(this.data.product2.name).as("response2");
      cy.GetProductByName(this.data.product3.name).as("response3");
    });
    cy.visit("");
  });

  it("Deberia permitir al usuario agregar mas de un producto al carrito y validar el mismo", function () {
    const product1 = Cypress._.find(this.response1.body.products.docs, {
      name: this.data.product1.name,
    });
    const product2 = Cypress._.find(this.response2.body.products.docs, {
      name: this.data.product2.name,
    });
    const product3 = Cypress._.find(this.response3.body.products.docs, {
      name: this.data.product3.name,
    });
    this.data.product1.price = product1.price;
    this.data.product2.price = product2.price;
    this.data.product3.price = product3.price;
    cy.get('[data-cy="onlineshoplink"]').click();
    cy.get(`[name="${this.data.product1.name}"]`).click();
    cy.getByDataCy("closeModal").click();
    cy.get(`[name="${this.data.product2.name}"]`).click();
    cy.getByDataCy("closeModal").click();
    cy.get(`[name="${this.data.product3.name}"]`).click();
    cy.getByDataCy("closeModal").click();
    cy.getByDataCy("goShoppingCart").click();
    cy.get(`[name='${this.data.product1.name}']`).should(
      "have.text",
      this.data.product1.name
    );
    cy.get(`[name='${this.data.product1.name}']`)
      .siblings("#unitPrice")
      .should("have.text", `$${this.data.product1.price}`);
    cy.get(`[name='${this.data.product2.name}']`).should(
      "have.text",
      this.data.product2.name
    );
    cy.get(`[name='${this.data.product2.name}']`)
      .siblings("#unitPrice")
      .should("have.text", `$${this.data.product2.price}`);
    cy.get(`[name='${this.data.product3.name}']`).should(
      "have.text",
      this.data.product3.name
    );
    cy.get(`[name='${this.data.product3.name}']`)
      .siblings("#unitPrice")
      .should("have.text", `$${this.data.product3.price}`);
  });
});
