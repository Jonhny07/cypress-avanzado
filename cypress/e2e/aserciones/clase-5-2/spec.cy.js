const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {
    const date = new Date();
    before(() => {
        // cy.login(Cypress.env().usuario, Cypress.env().password);
        // cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).as('data')
        // cy.visit('');
        // cy.intercept('https://pushing-it.onrender.com/api/products?page=1&limit=8').as('getProducts')
        // cy.get('[data-cy="onlineshoplink"]').click();
    });

    it('Deberia permitir al usuario validar productos', function () {
        cy.wait('@getProducts').then(interception => {
            cy.verificarProducto(0, this.data.productos.producto1)
            cy.verificarProductos(interception.response.body.products.docs)

        })
    });

    it('Deberia permitir al usuario validar shoppingCart', function () {

        this.data.productos.producto1.totalPrice = this.data.productos.producto1.quantity * this.data.productos.producto1.price

        cy.get('[id="add-to-cart-1000"]').click()
        cy.getByDataCy('closeModal').click()

        cy.get('[id="add-to-cart-1000"]').click()
        cy.getByDataCy('closeModal').click()

        cy.get('[id="add-to-cart-1005"]').click()
        cy.getByDataCy('closeModal').click()
        cy.getByDataCy('goShoppingCart').click()

        cy.verificarShoppingCart(0, this.data.productos.producto1)
    });

    it.only('fechas', function () {
        
        let data = date.toLocaleDateString('en-UK');
        let data1 = date.toLocaleDateString('es-es');;
        let data2 = date.toLocaleDateString('en-US');;
        cy.then(() => {
            cy.log(date)
            cy.log(data)
            cy.log(data1)
            cy.log(data2)
        })

    });

});