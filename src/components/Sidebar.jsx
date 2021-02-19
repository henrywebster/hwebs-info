import React from "react"
import {
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListSubheader,
  Box,
  Switch,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
import SportsEsportsIcon from "@material-ui/icons/SportsEsports"
import EmailIcon from "@material-ui/icons/Email"

import computer from "../images/computer-animated-glow.gif"

export default function Sidebar(props) {

  const navigationData = [
    { text: "Home", icon: <HomeIcon />, selected: props.selected === "home" },
    { text: "About", icon: <EmojiPeopleIcon />, selected: props.selected === "about" }
  ]

  return (
    <Drawer open={true} BackdropProps={{ invisible: true }} variant="permanent">
      <Box component="span" m={2}>
        <img src={computer} width="200px" />
        <Typography variant="h4" component="h1" color="primary">
          Henry J. Webster
        </Typography>
      </Box>
      <List>
        <Divider />
        <ListSubheader>Navigation</ListSubheader>
        {navigationData.map(item => (
          <ListItem button selected={item.selected}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        <Divider />
        <ListSubheader>Control Panel</ListSubheader>
        {[{ text: "Dark Mode" }].map(item => (
          <ListItem>
            <ListItemText primary={item.text} />
            <Switch color="primary" />
          </ListItem>
        ))}
        <Divider />
        <ListSubheader>Contact</ListSubheader>
        {[
          {
            text: "Email",
            icon: <EmailIcon />,
            href: "mailto:hwebs@hwebs.info",
          },
          {
            text: "Twitter",
            icon: <TwitterIcon />,
            href: "https://twitter.com/hank29a",
          },
        ].map(item => (
          <ListItem button component="a" href={item.href} target="_blank">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
