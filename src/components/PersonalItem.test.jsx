import { shallow } from "enzyme"
import { PersonalItem, InfoType } from "./PersonalItem"
import PersonIcon from "@material-ui/icons/Person"
import WorkRoundedIcon from "@material-ui/icons/WorkRounded"
import EmailRoundedIcon from "@material-ui/icons/EmailRounded"
import LocationCityRoundedIcon from "@material-ui/icons/LocationCityRounded"
import ListItemText from "@material-ui/core/ListItemText"

describe("Personal Item Component", () => {
  it("renders Person Icon when InfoType is NAME", () => {
    const wrapper = shallow(<PersonalItem icon={InfoType.NAME} />)
    expect(wrapper.containsMatchingElement(<PersonIcon />)).toBeTruthy()
  })
})

describe("Personal Item Component", () => {
  it("renders Work Rounded Icon when InfoType is CAREER", () => {
    const wrapper = shallow(<PersonalItem icon={InfoType.CAREER} />)
    expect(wrapper.containsMatchingElement(<WorkRoundedIcon />)).toBeTruthy()
  })
})

describe("Personal Item Component", () => {
  it("renders Email Rounded Icon when InfoType is EMAIL", () => {
    const wrapper = shallow(<PersonalItem icon={InfoType.EMAIL} />)
    expect(wrapper.containsMatchingElement(<EmailRoundedIcon />)).toBeTruthy()
  })
})

describe("Personal Item Component", () => {
  it("renders Location City Rounded Icon when InfoType is LOCATION", () => {
    const wrapper = shallow(<PersonalItem icon={InfoType.LOCATION} />)
    expect(
      wrapper.containsMatchingElement(<LocationCityRoundedIcon />)
    ).toBeTruthy()
  })
})

describe("Personal Item Component", () => {
  it("renders text", () => {
    const wrapper = shallow(<PersonalItem text="Frodo" />)
    expect(wrapper.find(ListItemText).props().primary).toEqual("Frodo")
  })
})
