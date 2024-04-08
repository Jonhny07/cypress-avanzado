Cypress.Commands.add("eliminarProducto", (id) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env().baseUrlAPI}/products?id=${id}`,
    failsOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env().token}`,
    },
  })
    .its("body.products.docs")
    .each((product) => {
      cy.request({
        method: "DELETE",
        url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
        headers: {
          Authorization: `Bearer ${Cypress.env().token}`,
        },
      });
    });
});


//////////////////////// otra opcion
/*
Cypress.Commands.add("eliminarProducto2", (_id) => {
      cy.request({
        method: "DELETE",
        url: `${Cypress.env().baseUrlAPI}/product/${_id}`,
        headers: {
          Authorization: `Bearer ${Cypress.env().token}`,
        },
      });
    });

Cypress.Commands.add("obtenerProducto", (id) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env().baseUrlAPI}/products?id=${id}`,
    failsOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env().token}`,
    },
  })
});
*/
//////////////////////////////

Cypress.Commands.add("crearProducto", (body) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env().baseUrlAPI}/create-product`,
    body: body,
  });
});
Cypress.Commands.add("GetProductByName", (productName) => {
  cy.request({
    method: "GET",
    url: `${Cypress.env().baseUrlAPI}/products?name=${productName}`,
    failsOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env().token}`,
    },
  });
});
