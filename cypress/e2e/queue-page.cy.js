import { changings, circleContent } from "../utils";

describe("should cheeck logic and animation queue", () => {
  beforeEach(function () {
    cy.visit("queue");
    cy.get("input").clear("");
  });

  it("should cheeck disabled buttons", () => {
    cy.get("input").clear("");
    cy.get(".add_button").should("be.disabled");
  });

  it("should cheeck disabled buttons", () => {
    cy.get("input").clear("");
    cy.get(".add_button").should("be.disabled");
    cy.get(".delete_button").should("be.disabled");
    cy.get(".remove_button").should("be.disabled");
  });

  it("should correctly add element in stack", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();
    cy.get(changings).as("changings");
    cy.get(circleContent).as("circleContent");

    cy.get("@changings", { timeout: 0 });
    cy.get("@changings").not();

    cy.get("@circleContent").first().contains("head");
    cy.get("@circleContent").last().contains("tail");

    cy.get("input").type("2");
    cy.get(".add_button").click();

    cy.get("@changings", { timeout: 0 });
    cy.get("@changings").not();

    cy.get("@circleContent").first().contains("head");
    cy.get("@circleContent").last().contains("tail");
  });

  it("should correctly delete element from stack", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();
    cy.get("input").clear("");

    cy.get("input").type("2");
    cy.get(".add_button").click();
    cy.get("input").clear("");

    cy.get(".delete_button").click();

    cy.get(circleContent).as("circleContent");

    cy.get("@circleContent").should("contain", "2");
    cy.get("@circleContent").not("contain", "1");
  });

  it("stack should be empty after click button remove ", () => {
    cy.get("input").type("1");
    cy.get(".add_button").click();
    cy.get("input").clear("");

    cy.get("input").type("2");
    cy.get(".add_button").click();
    cy.get("input").clear("");

    cy.get(".remove_button").click();

    cy.get(circleContent).should("not.exist");
  });
});
