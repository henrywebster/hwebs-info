import React from "react"
import { shallow } from "enzyme"
import Typography from "@material-ui/core/Typography"
import AboutMe from "./AboutMe"

describe("About Me page", () => {
  it("renders basic text", () => {
    const wrapper = shallow(<AboutMe />)
    expect(wrapper.find(Typography).text()).toEqual("About Me")
  })
})
