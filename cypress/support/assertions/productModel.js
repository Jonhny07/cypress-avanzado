Cypress.Commands.add("verificarProducto", (line, producto) => {
  cy.get('[class="css-4t9hm0"]')
    .eq(line)
    .within(() => {
      cy.get('[data-cy="name"]').should("have.text", producto.name);
      cy.get('[data-cy="price"]').should("have.text", producto.price);
    });
});

Cypress.Commands.add("verificarProductos", (producto) => {
  let index = 0;
  Cypress._.forEach(productos, (producto) => {
    cy.get('[class="css-4t9hm0"]')
      .eq(line)
      .within(() => {
        cy.get('[data-cy="name"]').should("have.text", producto.name);
        cy.get('[data-cy="price"]').should("have.text", producto.price);
      });
      index++
  });
});

