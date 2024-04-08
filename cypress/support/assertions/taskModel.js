Cypress.Commands.add("verificarTarea", (tarea) => {
  /*cy.contains("p", tarea.nombre);

  cy.contains("p", tarea.nombre)
    .invoke("attr", "style")
    .then((style) => {
      if (completed) {
        expect(style).to.be.equal("text-decoration: line-through;");
      }else {
        expect(style).to.be.equal("text-decoration: none;");
      }
    });*/

  cy.contains("p", tarea.nombre);
  cy.contains("p", tarea.nombre)
    .invoke("attr", "style")
    .then((style) => {
      tarea.completed
        ? expect(style).to.be.equal("text-decoration: line-through;")
        : expect(style).to.be.equal("text-decoration: none;");
    });
});
