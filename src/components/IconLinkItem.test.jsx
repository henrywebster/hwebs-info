import React from "react"
import { render, screen } from "@testing-library/react"
import IconLinkItem from "./IconLinkItem"

describe("IconLinkItem", () => {
  test("is button", () => {
    render(<IconLinkItem primary="Button" />)
    expect(screen.getByRole("button")).toHaveTextContent("Button")
  })

  test("is link", () => {
    render(<IconLinkItem />)
    expect(screen.getByRole("button").closest("a")).toBeTruthy()
  })

  test("link goes to other page", () => {
    render(<IconLinkItem to="/about" />)
    expect(screen.getByRole("button").closest("a")).toHaveAttribute(
      "href",
      "/about"
    )
  })
})
