import { render, screen } from "@testing-library/react"
import App from "./App"

test("basic render", () => {
  render(<App />)
  expect(screen.getByText("Tap the big square to scan a puzzle")).toBeInTheDocument()
})
