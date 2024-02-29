describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000/stack");
    cy.get("input").clear("");
  });

  it("should cheeck disabled buttons", () => {
    cy.get("input").clear("");
    cy.get(".add_button").should("be.disabled");
    cy.get(".delete_button").should("be.disabled");
    cy.get(".remove_button").should("be.disabled");
  });

  it("should correctly delete element from stack", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("input").type("2");
    cy.get(".add_button").click();

    cy.get(".delete_button").click();

    cy.get("div[class*=circle_circle]").should("contain", "1");
    cy.get("div[class*=circle_circle]").not("contain", "12");
  });

  it("should correctly add element in stack", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("div[class*=circle_changing]", { timeout: 0 });
    cy.get("div[class*=circle_changing]").not();

    cy.get("[class*=circle_content]").first().contains("top");
    cy.get("[class*=circle_content]").last().contains("tail");

    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("div[class*=circle_changing]", { timeout: 0 });
    cy.get("div[class*=circle_changing]").not();

    cy.get("[class*=circle_content]").first().contains("top");
    cy.get("[class*=circle_content]").last().contains("tail");
  });

  it("stack should be empty after click button remove ", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("input").type("2");
    cy.get(".add_button").click();

    cy.get(".remove_button").click();

    cy.get("div[class*=circle_circle]").should("not.exist");
  });
});
