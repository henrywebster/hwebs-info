import React from "react"
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import { Link } from "gatsby"

export default function ({ primary, icon, ...props }) {
  return (
    <ListItem button component={Link} {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}
