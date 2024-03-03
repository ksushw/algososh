import { baseUrl } from "../../utils";

describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("should open and close string page", function () {
    cy.get(".link_recursion").click();
    cy.contains("Строка");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });

  it("should open and close fibonacci page", function () {
    cy.get(".link_fibonacci").click();
    cy.contains("Последовательность Фибоначчи");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });

  it("should open and close sorting page", function () {
    cy.get(".link_sorting").click();
    cy.contains("Сортировка массива");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });

  it("should open and close stack page", function () {
    cy.get(".link_stack").click();
    cy.contains("Стек");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });

  it("should open and close queue page", function () {
    cy.get(".link_queue").click();
    cy.contains("Очередь");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });

  it("should open and close string page", function () {
    cy.get(".link_list").click();
    cy.contains("Связный список");
    cy.get("button").contains("К оглавлению").click();
    cy.url().should("eq", baseUrl);
  });
});
