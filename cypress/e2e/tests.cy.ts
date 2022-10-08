/* eslint-disable jest/expect-expect */

/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

const INITIAL_MESSAGE = "Tap the big square to scan a puzzle"
const SCANNING_MESSAGE = "Tap the big square to cancel"
const SCANNED_MESSAGE = "Tap the big square to start over"

const MICROSCOPE_EMOJI = "\u{1F52C}"
const NERD_FACE_EMOJI = "\u{1F913}"

const SCANNING_TIMEOUT = 20000

const clickFrame = () => {
  cy.findByTestId("frame").click()
}

const openDiagnosticsSettingsPanel = () => {
  cy.findByText(MICROSCOPE_EMOJI).click()
}

const closeDiagnosticsSettingsPanel = () => {
  cy.get("body").click()
}

const openNerdyStatsSettingsPanel = () => {
  cy.findByText(NERD_FACE_EMOJI).click()
}

const closeNerdyStatsSettingsPanel = () => {
  cy.get("body").click()
}

describe("e2e tests", () => {

  beforeEach(() => {
    cy.visit("/")
  })

  it("should display the correct message when in Initial mode", () => {
    cy.findByText(INITIAL_MESSAGE)
  })

  it("should display the correct messages when changing mode from Initial => Scanning => Initial", () => {
    cy.findByText(INITIAL_MESSAGE)

    clickFrame()
    cy.findByText(SCANNING_MESSAGE)

    clickFrame()
    cy.findByText(INITIAL_MESSAGE)
  })

  it("should display the correct messages when changing mode from Initial => Scanning => Scanned => Initial", () => {
    cy.findByText(INITIAL_MESSAGE)

    clickFrame()
    cy.findByText(SCANNING_MESSAGE)

    cy.findByText(SCANNED_MESSAGE, { timeout: SCANNING_TIMEOUT })

    clickFrame()
    cy.findByText(INITIAL_MESSAGE)
  })

  describe("diagnostics", () => {

    it("should show bounding box during scanning when enabled", () => {
      openDiagnosticsSettingsPanel()
      cy.findByText("Show bounding Box").click({ force: true })
      closeDiagnosticsSettingsPanel()
      clickFrame()
      cy.get("rect[fill=none]").should("have.attr", "stroke", "#0000FF")
      cy.findByText(SCANNED_MESSAGE, { timeout: SCANNING_TIMEOUT })
    })

    it("should show corners during scanning when enabled", () => {
      openDiagnosticsSettingsPanel()
      cy.findByText("Show corners").click({ force: true })
      closeDiagnosticsSettingsPanel()
      clickFrame()
      cy.get("polygon[fill=none]").should("have.attr", "stroke", "#FF00FF")
      cy.findByText(SCANNED_MESSAGE, { timeout: SCANNING_TIMEOUT })
    })

    it("should show contour during scanning when enabled", () => {
      openDiagnosticsSettingsPanel()
      cy.findByText("Show contour").click({ force: true })
      closeDiagnosticsSettingsPanel()
      clickFrame()
      cy.get("polygon[fill=none]").should("have.attr", "stroke", "#FF0000")
      cy.findByText(SCANNED_MESSAGE, { timeout: SCANNING_TIMEOUT })
    })
  })

  describe("nerdy stats", () => {
    it("should show nerdy stats when enabled", () => {
      openNerdyStatsSettingsPanel()
      cy.findByText("Show nerdy stats").click({ force: true })
      closeNerdyStatsSettingsPanel()
      clickFrame()
      cy.findByText(/^Frame count:/)
      cy.findByText(/^Elapsed time:/)
      cy.findByText(/^Frames per second:/)
      cy.findByText(SCANNED_MESSAGE, { timeout: SCANNING_TIMEOUT })
    })
  })
})
