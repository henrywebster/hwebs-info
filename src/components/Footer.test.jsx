import React from "react"
import { render, screen } from "@testing-library/react"
import Footer from "./Footer"
import IconLinkItem from "./IconLinkItem"

describe("Footer", () => {
  test("has notices", () => {
    render(<Footer notices={["2021"]} />)
    expect(screen.getByText(/2021/)).toBeTruthy()
  })

  test("displays no notice when not given", () => {
    render(<Footer />)
    expect(screen.queryByRole("listitem")).toBeFalsy()
  })

  test("has buttons", () => {
    const buttonA = <IconLinkItem primary="Button A" />
    render(<Footer buttons={[buttonA]} />)
    expect(screen.getByText(/Button A/)).toBeTruthy()
  })
})
