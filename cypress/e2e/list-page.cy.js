describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/list");
  });

  it("should cheack value input", () => {
    cy.get(".value_input > input").clear("");
    cy.get(".add_head_button").should("be.disabled");
    cy.get(".add_tail_button").should("be.disabled");
    cy.get(".add_by_index_button").should("be.disabled");
  });

  it("should cheack index input", () => {
    cy.get(".index_input > input").clear("");
    cy.get(".add_by_index_button").should("be.disabled");
    cy.get(".remove_by_index_button").should("be.disabled");
  });
});
