import React from "react"
import { render, screen } from "@testing-library/react"
import Section from "./section"

describe("Section", () => {
  test("renders children", () => {
    render(<Section id="home">Welcome</Section>)
    expect(screen.getByText(/^Welcome$/)).toBeTruthy()
  })
  test("has correct id", () => {
    render(<Section id="about">About Me</Section>)
    expect(screen.getByText(/^About Me$/)).toHaveProperty("id", "about")
  })
})
