import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ControlPanelItem from "./ControlPanelItem"

describe("ControlPanelItem", () => {
  test("renders given text", () => {
    render(<ControlPanelItem text="Dark Mode" />)
    const text = screen.getByText(/Dark Mode/)
    expect(text).toHaveTextContent("Dark Mode")
  })

  test("has unchecked switch by default", () => {
    render(<ControlPanelItem text="Dark Mode" />)
    expect(screen.getByLabelText(/Dark Mode/)).not.toBeChecked()
  })

  test("has checked switch when prop is passed true", () => {
    render(<ControlPanelItem text="Dark Mode" checked={true} />)
    expect(screen.getByLabelText(/Dark Mode/)).toBeChecked()
  })

  test("switch is checked when unchecked and acted upon", () => {
    render(<ControlPanelItem text="Dark Mode" />)
    userEvent.click(screen.getByLabelText(/Dark Mode/))
    expect(screen.getByLabelText(/Dark Mode/)).toBeChecked()
  })

  test("switch is unchecked when checked and acted upon", () => {
    render(<ControlPanelItem text="Dark Mode" checked={true} />)
    userEvent.click(screen.getByLabelText(/Dark Mode/))
    expect(screen.getByLabelText(/Dark Mode/)).not.toBeChecked()
  })

  test("switch runs onChange when acted upon", () => {
    let a = false
    const onChange = () => (a = true)
    render(<ControlPanelItem text="Dark Mode" onChange={onChange} />)
    userEvent.click(screen.getByLabelText(/Dark Mode/))
    expect(a).toBeTruthy()
  })
})
