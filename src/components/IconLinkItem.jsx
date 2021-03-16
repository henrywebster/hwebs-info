import React from "react"
import { ListItem, ListItemText, ListItemIcon } from "@material-ui/core"
import { Link } from "gatsby"

export default function ({ primary, icon, to = "", ...props }) {
  const isExternal = to.startsWith("http") || to.startsWith("mailto:")

  return (
    // TODO: fix forward ref console warning
    <ListItem
      button
      component={isExternal ? "a" : Link}
      to={to}
      href={to}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}
