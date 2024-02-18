describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/queue");
  });

  it("passes", () => {
    cy.get("input").clear("");
    cy.get(".add_button").should("be.disabled");
  });
});
