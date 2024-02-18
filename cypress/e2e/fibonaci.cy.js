describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("passes", () => {
    cy.get("input").clear("");
    cy.get(".calculate_button").should("be.disabled");
  });
});
