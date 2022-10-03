/* eslint-disable jest/expect-expect */

/// <reference types="cypress" />

describe("tests", () => {
  it("test 1", () => {
    cy.visit("http://localhost:3333/sudoku-buster-react")
    cy.findByText("Tap the big square to scan a puzzle")
  })

  it("test 2", () => {
    cy.visit("http://localhost:3333/sudoku-buster-react")
    cy.findByText("Tap the big square to scan a puzzle")
    cy.findByTestId("frame").click()
    cy.findByText("Tap the big square to cancel")
    cy.findByTestId("frame").click()
    cy.findByText("Tap the big square to scan a puzzle")
  })
})
