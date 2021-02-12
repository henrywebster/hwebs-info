import { ListItem } from "@material-ui/core"
import React from "react"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import PersonIcon from "@material-ui/icons/Person"
import WorkRoundedIcon from "@material-ui/icons/WorkRounded"
import EmailRoundedIcon from "@material-ui/icons/EmailRounded"
import LocationCityRoundedIcon from "@material-ui/icons/LocationCityRounded"

const InfoType = Object.freeze({
  NAME: <PersonIcon />,
  LOCATION: <LocationCityRoundedIcon />,
  CAREER: <WorkRoundedIcon />,
  EMAIL: <EmailRoundedIcon />,
})

const PersonalItem = props => {
  return (
    <ListItem>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  )
}

export { PersonalItem, InfoType }
