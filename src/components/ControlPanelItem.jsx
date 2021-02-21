import React from "react"
import { ListItem, ListItemText, Switch } from "@material-ui/core"

const ControlPanelItem = ({ text, checked, onChange = () => {} }) => {
  const [switchOn, setSwitchOn] = React.useState(checked || false)

  const onSwitchChange = () => {
    setSwitchOn(!switchOn)
    onChange()
  }

  return (
    <ListItem>
      <ListItemText primary={text} />
      <Switch
        color="primary"
        checked={switchOn}
        onChange={onSwitchChange}
        disableRipple={true}
      />
    </ListItem>
  )
}

export default ControlPanelItem
