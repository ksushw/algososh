describe("should cheeck disable button", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("passes", () => {
    cy.get("input").clear("");
    cy.get(".button_reverse").should("be.disabled");
  });
});
