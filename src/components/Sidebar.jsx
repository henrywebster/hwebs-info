import React from "react"
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  ListSubheader,
  Box,
  CssBaseline,
  ThemeProvider,
  Container,
  Grid,
  Paper,
  makeStyles,
  Hidden,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
import SportsEsportsIcon from "@material-ui/icons/SportsEsports"
import EmailIcon from "@material-ui/icons/Email"
import "@fontsource/source-sans-pro"
import "@fontsource/source-sans-pro/900.css"

import computer from "../images/computer-animated-glow.gif"
import { lightTheme, darkTheme } from "../../theme"
import ControlPanelItem from "./ControlPanelItem"

export default function Sidebar({ children }) {
  const [activeTheme, setActiveTheme] = React.useState("dark")

  const themeToggler = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark")
  }

  const navigation = [
    { text: "Home", icon: <HomeIcon />, selected: true },
    {
      text: "About",
      icon: <EmojiPeopleIcon />,
      selected: false,
    },
  ]

  const content = [
    {
      subtitle: "Navigation",
      component: navigation.map(item => (
        <ListItem button selected={item.selected}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )),
    },
    {
      subtitle: "Control Panel",
      component: [{ text: "Dark Mode", checked: true }].map(item => (
        <ControlPanelItem
          text={item.text}
          checked={item.checked}
          onChange={themeToggler}
        />
      )),
    },
    {
      subtitle: "Contact",
      component: [
        {
          text: "Email",
          icon: <EmailIcon />,
          href: "mailto:hwebs@hwebs.info",
        },
        {
          text: "GitHub",
          icon: <GitHubIcon />,
          href: "https://github.com/henrywebster",
        },
        {
          text: "Twitter",
          icon: <TwitterIcon />,
          href: "https://twitter.com/hank29a",
        },
        {
          text: "itch.io",
          icon: <SportsEsportsIcon />,
          href: "https://hank29a.itch.io/",
        },
      ].map(item => (
        <ListItem button component="a" href={item.href} target="_blank">
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )),
    },
  ]

  const theme = activeTheme === "dark" ? darkTheme : lightTheme

  // Custom CSS to copy Drawer look
  // TODO: find a better way
  const useStyles = makeStyles({
    paper: {
      borderRight: `1px solid ${theme.palette.divider}`,
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      flex: "0 0 auto",
      width: "320px",
    },
    content: {
      marginLeft: "320px",
    },
  })

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Grid container spacing={3} alignItems="center">
        <Grid item md={4}>
          <Hidden smDown>
            <Box>
              <Paper square elevation={0} className={classes.paper}>
                <Box component="span" m={3}>
                  <img src={computer} width="200px" />
                  <Typography variant="h4" component="h2" color="primary">
                    Henry J. Webster
                  </Typography>
                </Box>
                <List>
                  {content.map(item => (
                    <>
                      <Divider />
                      <ListSubheader>{item.subtitle}</ListSubheader>
                      {item.component}
                    </>
                  ))}
                </List>
              </Paper>
            </Box>
          </Hidden>
        </Grid>
        <Grid container item xs={12} md={8}>
          <Container maxWidth="md">{children}</Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
