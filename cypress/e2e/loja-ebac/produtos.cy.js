/// <reference types="cypress"/>

import produtosPage from "../../support/page-objects/produtos.page";

describe("Funcionalidade: Produtos", () => {
    beforeEach(() => {
        produtosPage.visitarUrl();
    });

    it("Deve selecionar um produto da lista", () => {
        produtosPage.buscarProdutoLista("Arcadio Gym Short");
        cy.get("#tab-title-description > a").should("contain", "Descrição");
    });

    it("Deve buscar um produto com sucesso", () => {
        let produto = "Aether Gym Pant";
        produtosPage.buscarProduto(produto);
        cy.get(".product_title").should("contain", produto);
    });

    it("Deve visitar a página do produto", () => {
        produtosPage.visitarProduto("Atlas Fitness Tank");
    });

    it("Deve adicionar produto ao carrinho", () => {
        let qtd = 5;
        produtosPage.buscarProduto("Typhon Performance Fleece-lined Jacket");
        produtosPage.addProdutoCarrinho("M", "Red", qtd);

        cy.get(".woocommerce-message")
        .should("contain", 
        qtd + " × “Typhon Performance Fleece-lined Jacket” foram adicionados no seu carrinho.");
    });

    it.only("Deve adicionar produto ao carrinho buscando da massa de dados", () => {
        cy.fixture("produtos").then((dados) => {
            produtosPage.buscarProduto(dados[0].nomeProduto);
            produtosPage.addProdutoCarrinho(
                dados[0].tamanho,
                dados[0].cor,
                dados[0].quantidade
            );
            cy.get(".woocommerce-message").should("contain",dados[0].nomeProduto);
        });
    });
});