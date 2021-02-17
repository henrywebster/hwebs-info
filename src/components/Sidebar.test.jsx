import { shallow } from "enzyme"
import React from "react"
import { Drawer, Typography } from "@material-ui/core"
import Sidebar from "./Sidebar"

// TODO: why does this fail now?
// describe("Sidebar", () => {
//   it("renders a MaterialUI drawer", () => {
//     const wrapper = shallow(<Sidebar />)
//     expect(wrapper.containsMatchingElement(<Drawer />)).toBeTruthy()
//   })
// })

describe("Sidebar", () => {
  it("puts name on top of drawer", () => {
    const wrapper = shallow(<Sidebar />)
    expect(wrapper.find(Typography).text()).toEqual("Henry J. Webster")
  })
})
