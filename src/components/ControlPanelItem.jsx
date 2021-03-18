import React from "react"
import {
  ListItem,
  Switch,
  FormControlLabel,
  withStyles,
} from "@material-ui/core"

// TODO: try with label on lieft and right, account for margin

const style = theme => ({
  labelLeft: {
    marginLeft: 0,
  },
  labelRight: {
    marginRight: 10,
  },
})

const Control = ({ checked, onChange, className }) => (
  <Switch
    color="primary"
    checked={checked}
    onChange={onChange}
    className={className}
  />
)

const ControlPanelItem = withStyles(style)(
  ({
    classes,
    text,
    checked = false,
    onChange = () => {},
    variant = "right",
  }) => {
    // TODO: move to HOC?
    const [on, setOn] = React.useState(checked)

    const toggle = () => {
      setOn(!on)
      onChange()
    }

    return (
      <ListItem>
        <FormControlLabel
          control={
            <Control
              checked={on}
              onChange={toggle}
              className={variant === "right" ? classes.labelRight : undefined}
            />
          }
          label={text}
          labelPlacement={variant === "left" ? "start" : "end"}
          className={variant === "left" ? classes.labelLeft : undefined}
        />
      </ListItem>
    )
  }
)

export default ControlPanelItem
