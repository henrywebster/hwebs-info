import React from "react"
import { shallow } from "enzyme"
import { ListItemText, Switch } from "@material-ui/core"
import ControlPanelItem from "./ControlPanelItem"

describe("ControlPanelItem", () => {
  it("renders given text", () => {
    const wrapper = shallow(<ControlPanelItem text="Dark Mode" />)
    expect(wrapper.find(ListItemText).props().primary).toEqual("Dark Mode")
  })
})

describe("ControlPanelItem", () => {
  it("has unchecked switch by default", () => {
    const wrapper = shallow(<ControlPanelItem text="Dark Mode" />)
    expect(wrapper.find(Switch).props().checked).toBeFalsy()
  })
})

describe("ControlPanelItem", () => {
  it("has checked state when true props is passed", () => {
    const wrapper = shallow(
      <ControlPanelItem text="Dark Mode" checked={true} />
    )
    expect(wrapper.find(Switch).props().checked).toBeTruthy()
  })
})

describe("ControlPanelItem", () => {
  it("changes to checked after being clicked", () => {
    const wrapper = shallow(<ControlPanelItem text="Dark Mode" />)
    wrapper.find(Switch).simulate("change")
    expect(wrapper.find(Switch).props().checked).toBeTruthy()
  })
})

describe("ControlPanelItem", () => {
  it("runs onChange after being clicked", () => {
    var a = false

    const wrapper = shallow(
      <ControlPanelItem
        text="Dark Mode"
        onChange={() => {
          a = true
        }}
      />
    )
    wrapper.find(Switch).simulate("change")
    expect(a).toBeTruthy()
  })
})
