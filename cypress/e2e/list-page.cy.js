import { changings, circleContent, modifieds, circleHead } from "../utils";
4;
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("should cheeck disabled buttons", () => {
  beforeEach(function () {
    cy.visit("list");
    cy.get(".value_input > input").type("1");
    cy.get(".add_tail_button").click();

    cy.get(".value_input > input").type("2");
    cy.get(".add_tail_button").click();

    cy.get(".value_input > input").type("3");
    cy.get(".add_tail_button").click();

    cy.get(".circle_1").should("contain", "1");
    cy.get(".circle_2").should("contain", "2");
    cy.get(".circle_3").should("contain", "3");
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

  it("should add in tail array", () => {
    cy.get(modifieds).as("modifieds");
    cy.get(".value_input > input").type("4");
    cy.get(".add_tail_button").click();

    cy.get(".circle_3", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "4");

    cy.wait(DELAY_IN_MS);

    cy.get("@modifieds").should("have.class", "circle_4");
    cy.wait(DELAY_IN_MS);
    cy.get("@modifieds").should("not.exist");

    cy.get(".circle_1").should("contain", "1");
    cy.get(".circle_2").should("contain", "2");
    cy.get(".circle_3").should("contain", "3");
    cy.get(".circle_4").should("contain", "4");
  });

  it("should add in head array", () => {
    cy.get(".value_input > input").type("0");
    cy.get(".add_head_button").click();

    cy.get(".circle_1", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "0");

    cy.wait(DELAY_IN_MS);
    cy.get(modifieds).as("modifieds");

    cy.get("@modifieds").should("have.class", "circle_1");
    cy.wait(DELAY_IN_MS);
    cy.get("@modifieds").should("not.exist");

    cy.get(".circle_1").should("contain", "0");
    cy.get(".circle_2").should("contain", "1");
    cy.get(".circle_3").should("contain", "2");
    cy.get(".circle_4").should("contain", "3");
  });

  it("should add by index in array", () => {
    cy.get(".value_input > input").type("mid");
    cy.get(".index_input > input").type("2");
    cy.get(".add_by_index_button").click();

    cy.get(".circle_1", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "mid");

    cy.get(modifieds).as("modifieds");

    cy.get("@modifieds").should("have.class", "circle_1");

    cy.get(".circle_2", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "mid");

    cy.get("@modifieds").should("have.class", "circle_2");

    cy.get("@modifieds").should("not.exist");

    cy.get(".circle_3", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "mid");

    cy.get(".circle_1").should("contain", "1");
    cy.get(".circle_2").should("contain", "2");
    cy.get(".circle_3").should("contain", "mid");
    cy.get(".circle_4").should("contain", "3");
  });

  it("should remove from head array", () => {
    cy.get(".remove_head_button").click();

    cy.get(".circle_1", { timeout: 0 }).should("not.include.text", "1");

    cy.get(".circle_1", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "1");

    cy.get(".circle_1").should("contain", "2");
    cy.get(".circle_2").should("contain", "3");
  });

  it("should remove from tail array", () => {
    cy.get(".remove_tail_button").click();

    cy.get(".circle_3", { timeout: 0 }).should("not.include.text", "3");

    cy.get(".circle_3", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "3");

    cy.get(".circle_1").should("contain", "1");
    cy.get(".circle_2").should("contain", "2");
  });

  it("should remove by index from array", () => {
    cy.get(".index_input > input").type("1");
    cy.get(".remove_by_index_button").click();

    cy.get(".circle_1", { timeout: 0 }).should("not.include.text", "1");
    cy.get(".circle_1", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "1");
    cy.wait(DELAY_IN_MS);
    cy.get(".circle_2", { timeout: 0 }).should("not.include.text", "2");
    cy.get(".circle_2", { timeout: 0 })
      .parent()
      .find(circleHead)
      .should("contain", "2");

    cy.get(".circle_1").should("contain", "1");
    cy.get(".circle_2").should("contain", "3");
  });
});
