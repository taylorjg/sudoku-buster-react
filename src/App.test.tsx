import { render, screen } from "@testing-library/react"
import App from "./App"

test("basic render", () => {
  render(<App />)
  expect(screen.getByRole("button", { name: "Scan" })).toBeInTheDocument()
})
