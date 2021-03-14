import React from "react"
import {
  ListItem,
  Switch,
  FormControlLabel,
  withStyles,
} from "@material-ui/core"

const Control = ({ checked, onChange }) => (
  <Switch color="primary" checked={checked} onChange={onChange} />
)

const ControlPanelItem = ({ text, checked = false, onChange = () => {} }) => {
  // TODO: move to HOC?
  const [on, setOn] = React.useState(checked)

  const toggle = () => {
    setOn(!on)
    onChange()
  }

  return (
    <ListItem>
      <FormControlLabel
        control={<Control checked={on} onChange={toggle} />}
        label={text}
      />
    </ListItem>
  )
}

export default ControlPanelItem
