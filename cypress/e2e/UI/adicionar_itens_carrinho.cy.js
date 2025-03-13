/// <reference types="cypress" />

import produtosPage from "../../support/page-objects/produtos.page";

context("US-0001 - Adicionar produtos ao carrinho", () => {

  beforeEach(() => {
    cy.visit("/minha-conta");
    cy.fixture("perfil").then((dados) => {
      cy.login(dados.usuario, dados.senha);
    });
  });

  it("Deve adicionar três produtos ao carrinho e validar", () => {

    // Buscar e adicionar 4 produtos ao carrinho
    cy.fixture("produtos").then((dados) => {
      dados.forEach((produto) => {
        produtosPage.buscarProduto(produto.nomeProduto);
        produtosPage.addProdutoCarrinho(
          produto.tamanho,
          produto.cor,
          produto.quantidade
        );
        cy.get(".woocommerce-message").should("contain", produto.nomeProduto);
      });
    });

    // Ir para o carrinho e validar se os preodutos estão corretos
    cy.visit("/carrinho");
    cy.fixture("produtos").then((dados) => {
      dados.forEach((produto) => {
        const nomeProdutoEsperado = `${produto.nomeProduto} - ${produto.tamanho}, ${produto.cor}`;
        
        cy.get(".cart_item .product-name a").should("contain", nomeProdutoEsperado);
      });
    });
    
  });
});