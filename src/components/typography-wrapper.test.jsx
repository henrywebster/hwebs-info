import React from "react"
import { render, screen } from "@testing-library/react"
import { LinkTypography } from "./typography-wrapper"

describe("Link Wrapper", () => {
  test("displays text", () => {
    render(<LinkTypography>website</LinkTypography>)
    expect(screen.getByText(/website/)).toHaveTextContent(/website/)
  })

  test("has link role", () => {
    render(<LinkTypography href="http://test.local">website</LinkTypography>)
    expect(screen.getByRole("link")).toHaveTextContent(/website/)
  })

  test("has correct link", () => {
    render(<LinkTypography href="http://test.local">website</LinkTypography>)
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "http://test.local"
    )
  })
})
