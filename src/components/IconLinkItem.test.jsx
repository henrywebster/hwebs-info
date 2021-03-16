import React from "react"
import { render, screen } from "@testing-library/react"
import IconLinkItem from "./IconLinkItem"

describe("IconLinkItem", () => {
  test("is button", () => {
    render(<IconLinkItem primary="Button" />)
    expect(screen.getByRole("button")).toHaveTextContent("Button")
  })

  test("link goes to other page", () => {
    render(<IconLinkItem to="/about" />)
    expect(screen.getByRole("button").closest("a")).toHaveAttribute(
      "href",
      "/about"
    )
  })

  test("mailto link is valid", () => {
    render(<IconLinkItem to="mailto:test@" />)
    expect(screen.getByRole("link").closest("a")).toHaveAttribute(
      "href",
      "mailto:test@"
    )
  })

  test("external link is a link", () => {
    render(<IconLinkItem to="https://com" />)
    expect(screen.getByRole("link").closest("a")).toHaveAttribute(
      "href",
      "https://com"
    )
  })
})
