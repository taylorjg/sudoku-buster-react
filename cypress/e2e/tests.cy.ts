/* eslint-disable jest/expect-expect */

/// <reference types="cypress" />

const INITIAL_MESSAGE = "Tap the big square to scan a puzzle"
const SCANNING_MESSAGE = "Tap the big square to cancel"
const SCANNED_MESSAGE = "Tap the big square to start over"

describe("e2e tests", () => {
  it("should display the correct message when in Initial mode", () => {
    cy.visit("/")
    cy.findByText(INITIAL_MESSAGE)
  })

  it("should display the correct messages when changing mode from Initial => Scanning => Initial", () => {
    cy.visit("/")

    cy.findByText(INITIAL_MESSAGE)

    cy.findByTestId("frame").click()
    cy.findByText(SCANNING_MESSAGE)

    cy.findByTestId("frame").click()
    cy.findByText(INITIAL_MESSAGE)
  })

  it("should display the correct messages when changing mode from Initial => Scanning => Scanned => Initial", () => {
    cy.visit("/")

    cy.findByText(INITIAL_MESSAGE)

    cy.findByTestId("frame").click()
    cy.findByText(SCANNING_MESSAGE)

    cy.findByText(SCANNED_MESSAGE, { timeout: 10000 })

    cy.findByTestId("frame").click()
    cy.findByText(INITIAL_MESSAGE)
  })
})
