const directorioName = __dirname.replaceAll('\\','/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0,-1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();
describe(`${scenarioName} - ${module}`, () => {
  it('Deberia permitir al usuario eliminar un producto', () => {
    //cy.log(directorioName)
    //cy.log(`crear producto ${testCaseId}`)
    cy.log(`Eliminar un producto numero ${testCaseId}`)
  })
})