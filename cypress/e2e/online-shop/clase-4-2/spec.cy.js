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
    cy.visit("");
    cy.get('[data-cy="todolistlink"]').click();
  });

  it("Deberia permitir al usuario agregar mas de un producto al carrito y validar el mismo", function () {
    cy.intercept("DELETE", "/api/tasks?userId=**").as("deleteTask");
    cy.intercept("GET", "/api/tasks?userId=**").as("getTasks");
    cy.get('[data-cy="removeAll"]', { timeout: 3000 }).should("be.visible").click();
    cy.wait("@deleteTask").its("response.statusCode").should("be.equal", 202);
    cy.get('[data-cy="task"]').type("Tarea{enter}");
    cy.intercept("POST", "/api/save-task", (req) => {
      expect(req.body.name).to.equal("Tarea");
      req.body.completed = true;
    });

    //cy.wait('@getTasks',{timeout:60000}).its('response.statusCode').should('be.equal',200)
    cy.wait("@getTasks", { timeout: 60000 }).then((intercept) => {
      expect(intercept.response.statusCode).to.be.equal(200);
      expect(intercept.response.body.tasks[0].name).to.be.equal("Tarea");
      //expect(intercept.response.body.tasks[0].name).to.be.equal("Tarea")
    });
    cy.contains("p", "Tarea").should("be.visible");
  });
});
