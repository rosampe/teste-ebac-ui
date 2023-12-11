/// <reference types="cypress"/>

describe('Funcionalidade login', () =>{

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/minha-conta/')        
    });

    afterEach(() => {
        cy.screenshot()        
    });

    it('Deve fazer login com sucesso', () => {
        cy.get('#username').type('rosampe.teste@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain' , 'Olá, rpedro.teste (não é rpedro.teste? Sair)')
    })

    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {
        cy.get('#username').type('rosampe@teste.com.br')
        cy.get('#password').type('teste@123')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('rosampe.teste@teste.com.br')
        cy.get('#password').type('teste321')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain' , 'Erro: a senha fornecida para o e-mail rpedro.teste@teste.com.br está incorreta.')
    });
})