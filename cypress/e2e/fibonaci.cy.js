describe("should cheeck animation and logic fibonaci", () => {
  beforeEach(function () {
    cy.visit("fibonacci");
  });

  it("should cheeck disabled buttons", () => {
    cy.get("input").clear("");
    cy.get(".calculate_button").should("be.disabled");
  });

  it("should cheeck correct numbers", () => {
    cy.get("input").type(5);
    cy.get(".calculate_button").click();
    cy.get("div[class*=circle_circle]").should(($el) => {
      expect($el.eq(0)).to.contain("1");
      expect($el.eq(1)).to.contain("1");
      expect($el.eq(2)).to.contain("2");
      expect($el.eq(3)).to.contain("3");
      expect($el.eq(4)).to.contain("5");
    });
  });
});
