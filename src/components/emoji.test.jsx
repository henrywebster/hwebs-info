import React from "react"
import { render, screen } from "@testing-library/react"
import Emoji from "./emoji"

describe("Emoji", () => {
  test("displays emoji", () => {
    render(<Emoji emoji="🧪" />)
    expect(screen.getByText("🧪")).toBeTruthy()
  })
  test("has img role", () => {
    render(<Emoji emoji="🧪" />)
    expect(screen.getByRole("img")).toBeTruthy()
  })
  test("has blank label", () => {
    render(<Emoji emoji="🧪" />)
    expect(screen.getByLabelText("")).toBeTruthy()
  })
})
