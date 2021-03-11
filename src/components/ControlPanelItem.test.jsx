import React from "react"
import { render } from "@testing-library/react"
import { toHaveTextContent } from "@testing-library/jest-dom"
import ControlPanelItem from "./ControlPanelItem"

describe("ControlPanelItem", () => {
  test("renders given text", () => {
    const { getByText } = render(<ControlPanelItem text="Dark Mode" />)
    const text = getByText(/Dark Mode/)
    expect(text).toHaveTextContent("Dark Mode")
  })
})
