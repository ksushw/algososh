import { changings, modifieds } from "../utils";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("should cheeck disablead button string page", () => {
  before(function () {
    cy.visit("recursion");
    cy.get("input").clear("");
  });

  it("Should cheeck disable button", () => {
    cy.get(".button_reverse").should("be.disabled");
  });
});

describe("should cheeck string page", () => {
  before(function () {
    cy.visit("recursion");
    cy.get("input").type("privet");
    cy.get(".button_reverse").click();
  });

  it("Should animation change", function () {
    cy.get(changings).as("changings");

    cy.get("@changings", { timeout: 0 }).should("satisfy", ($el) => {
      const classListFirst = Array.from($el[0].classList);
      const classListSecond = Array.from($el[1].classList);
      return (
        classListFirst.includes("circle_1") &&
        classListSecond.includes("circle_6")
      );
    });

    cy.wait(DELAY_IN_MS);
    cy.get(modifieds).as("modifieds");

    cy.get("@changings", { timeout: 0 }).should("satisfy", ($el) => {
      const classListFirst = Array.from($el[0].classList);
      const classListSecond = Array.from($el[1].classList);
      return (
        classListFirst.includes("circle_2") &&
        classListSecond.includes("circle_5")
      );
    });

    cy.get("@modifieds", { timeout: 0 })
      .should("satisfy", ($el) => {
        const classListFirst = Array.from($el[0].classList);
        const classListSecond = Array.from($el[1].classList);
        return (
          classListFirst.includes("circle_1") &&
          classListSecond.includes("circle_6")
        );
      })
      .and(($el) => {
        expect($el.eq(0)).to.contain("t");
        expect($el.eq(1)).to.contain("p");
      });

    cy.wait(DELAY_IN_MS);
    cy.get("@changings", { timeout: 0 }).should("satisfy", ($el) => {
      const classListFirst = Array.from($el[0].classList);
      const classListSecond = Array.from($el[1].classList);
      return (
        classListFirst.includes("circle_3") &&
        classListSecond.includes("circle_4")
      );
    });
    cy.get("@modifieds", { timeout: 0 })
      .should("satisfy", ($el) => {
        const classListFirst = Array.from($el[1].classList);
        const classListSecond = Array.from($el[2].classList);
        return (
          classListFirst.includes("circle_2") &&
          classListSecond.includes("circle_5")
        );
      })
      .and(($el) => {
        expect($el.eq(1)).to.contain("e");
        expect($el.eq(2)).to.contain("r");
      });

    cy.wait(DELAY_IN_MS);
    cy.get("@modifieds", { timeout: 0 })
      .should("satisfy", ($el) => {
        const classListFirst = Array.from($el[2].classList);
        const classListSecond = Array.from($el[3].classList);
        return (
          classListFirst.includes("circle_3") &&
          classListSecond.includes("circle_4")
        );
      })
      .and(($el) => {
        expect($el.eq(2)).to.contain("v");
        expect($el.eq(3)).to.contain("i");
      });
  });
});
