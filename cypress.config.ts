/// <reference types="cypress" />

import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3333/sudoku-buster-react",
    setupNodeEvents(on: Cypress.PluginEvents, _config: Cypress.PluginConfigOptions): void {
      on("before:browser:launch", (
        _browser: Cypress.Browser,
        launchOptions: Cypress.BrowserLaunchOptions
      ) => {
        launchOptions.args.push("--use-file-for-fake-video-capture=cypress/fixtures/scanning.y4m")
        return launchOptions
      })
    }
  }
})
