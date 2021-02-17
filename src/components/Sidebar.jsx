import React from "react"
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListSubheader,
} from "@material-ui/core"

export default function Sidebar() {
  return (
    <Drawer open={true} BackdropProps={{ invisible: true }}>
      <Typography variant="h4" component="h1" color="primary">
        Henry J. Webster
      </Typography>
      <Divider />
      <List>
        <ListSubheader>Navigation</ListSubheader>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
      </List>
    </Drawer>
  )
}
