describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/stack");
  });

  it("passes", () => {
    cy.get("input").clear("");
    cy.get(".add_button").should("be.disabled");
    cy.get(".delete_button").should("be.disabled");
    cy.get(".remove_button").should("be.disabled");
  });
});
