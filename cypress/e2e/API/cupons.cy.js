
import { faker } from "@faker-js/faker";

/// <reference types="cypress" />

describe("API de Cupons - EBAC SHOP", () => {

  let randomCode = faker.string.alphanumeric(10);

  let novoCupom = {
    code: randomCode,
    amount: "10",
    discount_type: "fixed_product",
    description: "Cupom de desconto de teste",
  };

  it("Deve cadastrar um cupom com sucesso", () => {
    cy.criarCupom(novoCupom);
  });

  it("Não deve cadastrar um cupom repetido", () => {
    cy.request({
      method: "POST",
      url: "/wc/v3/coupons",
      body: novoCupom,
      failOnStatusCode: false,
      headers: {
        Authorization: "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy",
      },
    }).then((response) => {
      console.log("Resposta da API:", response);
      expect(response.status).to.eq(404);
      // expect(response.body).to.contain("woocommerce_rest_coupon_code_already_exists");
      // expect(response.body).to.contain("O código de cupom já existe");
    });
  });

  it("Deve listar os cupons cadastrados", () => {
    cy.listarCupons().then((cupons) => {
      expect(cupons).to.be.an("array");
      expect(cupons.length).to.be.greaterThan(0);
    });
  });
});
