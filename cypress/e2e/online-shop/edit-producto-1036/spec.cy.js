/*const directorioName = __dirname.replaceAll("\\", "/");

const module = directorioName.split(/[/]/)[2];
const scenarioName = directorioName
  .slice(directorioName.lastIndexOf("/") + 1)
  .split("-")
  .slice(0, -1)
  .join("-");
const testCaseId = directorioName.split(/[-]/).pop();
describe(`${scenarioName} - ${module}`, () => {
  it("Deberia permitir al usuario eliminar un producto", () => {
    cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then((data) => {
      // cy.log(data);
      data.producto = `${data.producto}-${testCaseId}`;
      cy.log(`crear producto ${data.producto}`);
      cy.log(`Eliminar un producto numero ${data.producto}`);
    });
    //cy.log(`crear producto ${testCaseId}`);
    //cy.log(`Eliminar un producto numero ${testCaseId}`);
  });
});*/
