Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});


Cypress.Commands.add("criarCupom", (cupom) => {
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/wc/v3/coupons`,
      body: cupom,
      headers: {
        Authorization: "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy"
      },
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.code.toLowerCase()).to.eq(cupom.code.toLowerCase());
    });
  });
  
  Cypress.Commands.add("listarCupons", () => {
    cy.request({
      method: "GET",
      url: `${Cypress.env("apiUrl")}/wc/v3/coupons`,
      headers: {
        Authorization: "Basic YWRtaW5fZWJhYzpAYWRtaW4hJmJAYyEyMDIy"
      },
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
  });
  