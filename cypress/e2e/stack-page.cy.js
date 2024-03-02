import { changings, circleContent } from "../utils";

describe("should cheeck logic and animation stack", () => {
  beforeEach(function () {
    cy.visit("stack");
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
    cy.get(circleContent).as("circleContent");
    cy.get("@circleContent").should("contain", "1");
    cy.get("@circleContent").not("contain", "12");
  });

  it("should correctly add element in stack", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();
    cy.get(changings).as("changings");
    cy.get(circleContent).as("circleContent");

    cy.get("@changings", { timeout: 0 });
    cy.get("@changings").not();

    cy.get("@circleContent").first().contains("top");
    cy.get("@circleContent").last().contains("tail");

    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("@changings", { timeout: 0 });
    cy.get("@changings").not();

    cy.get("@circleContent").first().contains("top");
    cy.get("@circleContent").last().contains("tail");
  });

  it("stack should be empty after click button remove ", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();

    cy.get("input").type("2");
    cy.get(".add_button").click();

    cy.get(".remove_button").click();

    cy.get(circleContent).should("not.exist");
  });
});
