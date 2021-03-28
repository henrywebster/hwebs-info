import React from "react"
import { render, screen } from "@testing-library/react"
import { LinkTypography, HeadingTypography } from "./typography-wrapper"

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

describe("Heading Wrapper", () => {
  test("displays text", () => {
    render(<HeadingTypography>My Section</HeadingTypography>)
    expect(screen.getByText(/My Section/)).toHaveTextContent(/My Section/)
  })

  test("has heading role", () => {
    render(<HeadingTypography>My Section</HeadingTypography>)
    expect(screen.getByRole("heading")).toBeVisible()
  })
})
