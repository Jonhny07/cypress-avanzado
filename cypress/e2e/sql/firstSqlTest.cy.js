describe('Sql',()=>{
    it('First Sql Test',()=>{
        const query = 'SELECT id, name, lastname FROM public.users;'
        cy.task("connectDB",query).then(result =>{
           // expect(result).to.have.length(3)
            expect(result[0].name).to.equal("Juan")
            expect(result[0].id).to.equal(1)


            expect(result[0].lastname).to.equal("Perez")
            expect(result[0]).to.be.deep.equal({id : 1, name: 'Juan',lastname:'Perez'})


        })
    })
})