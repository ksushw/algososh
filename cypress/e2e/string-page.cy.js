import { wait } from "@testing-library/user-event/dist/utils";
import { ElementStates } from "../../src/types/element-states";

// describe("should cheeck disablead button string page", () => {
//   before(function () {
//     cy.visit("http://localhost:3000/recursion");
//     cy.get("input").clear("");
//   });

//   it("Should cheeck disable button", () => {
//     cy.get(".button_reverse").should("be.disabled");
//   });
// });

describe("should cheeck string page", () => {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
    cy.get("input").type("privet");
    cy.get(".button_reverse").click();
  });

  it("Should cheeck string animation", function () {
    cy.get("div[class*=circle_changing]").as("changing");

    // cy.get("div[class*=circle_modified]").as("modified");
    // cy.get("div[class*=circle_modified]")
    //   .should("have.class", "circle_1")
    //   .and(
    //     cy.get("div[class*=circle_modified]").should("have.class", "circle_5")
    //   );
    // cy.get("@modified").should("have.class", "circle_5");
    // cy.get("div[class*=circle_changing]").as("changing");

    // cy.get("div[class*=circle_content]  > div[class*=circle_changing]")
    //   .should("have.class", "circle_2")
    //   .and("have.class", "circle_4");

    cy.get("@changing").should("have.class", "circle_1");
    cy.get("@changing").should("have.class", "circle_2");

    cy.get("div[class*=circle_modified]").as("modified");

    cy.get("@modified").should("have.class", "circle_1");
    cy.get("@modified").should("have.class", "circle_2");
    // .and("have.class", "circle_5");

    // cy.get("div[class*=circle_modified]")
    //   .should("have.class", "circle_1")
    //   .and("have.class", "circle_5");
    // cy.wait(1000);
    // cy.get("div[class*=circle_modified]");
    // cy.wait(1000);
    // cy.get("div[class*=circle_modified]");
    // .as("modified");

    // cy.wait(500).then(() => {
    //   cy.get("div[class*=circle_modified]",  { timeout: 5000 }).as("modified");
    //   // cy.get("@modified").should("have.class", "circle_2");
    //   // cy.get("@modified").should("have.class", "circle_4");
    //   // cy.get("div[class*=circle_changing]").as("changing");
    // });
    // cy.wait(1000).then(() => {
    //   cy.get("div[class*=circle_modified]").as("expressDelivery");
    // });

    // new Cypress.Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve();
    //   }, num * 100);
    // });
    // cy.get(".button_reverse").click();

    // console.log("click");
    // cy.wait(50);

    // cy.get(".circle_3").should("have.css", "border-color", "rgb(127, 224, 81)");
    // cy.get(".circle_3").should(
    //   "not.have.css",
    //   "border",
    //   "4px solid rgb(127, 224, 81)"
    // );
  });
});
