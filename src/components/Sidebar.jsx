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
  makeStyles,
  Hidden,
  Drawer,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
import SportsEsportsIcon from "@material-ui/icons/SportsEsports"
import EmailIcon from "@material-ui/icons/Email"
import BuildIcon from "@material-ui/icons/Build"
import "@fontsource/source-sans-pro"
import "@fontsource/source-sans-pro/900.css"
import { Link } from "gatsby"
import computer from "../images/computer.png"
import { lightTheme, darkTheme } from "../../theme"
import ControlPanelItem from "./ControlPanelItem"

export default function Sidebar(props) {
  const currentPage = () => {
    const pathname = props.location.pathname

    if (pathname === "/") return "home"
    else if (pathname === "/about") return "about"
  }
  const [activeTheme, setActiveTheme] = React.useState("dark")
  const [activePage, setActivePage] = React.useState(currentPage)

  const themeToggler = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark")
  }

  const pageToggler = page => {
    setActivePage(page)
  }

  const theme = activeTheme === "dark" ? darkTheme : lightTheme

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
    marginBox: {
      width: "320px",
    },
    link: {
      color: "inherit",
      textDecoration: "inherit",
    },
  })

  const classes = useStyles()

  const navigation = [
    {
      id: "home",
      text: "Home",
      icon: <HomeIcon />,
      selected: activePage === "home",
      to: "/",
    },
    {
      id: "about",
      text: "About",
      icon: <EmojiPeopleIcon />,
      selected: activePage === "about",
      to: "/about",
    },
    {
      id: "projects",
      text: "Projects",
      icon: <BuildIcon />,
      selected: activePage === "projects",
      to: "/projects",
    },
  ]

  const content = [
    {
      subtitle: "Navigation",
      component: navigation.map(item => (
        <Link to={item.to} className={classes.link}>
          <ListItem
            button
            selected={item.selected}
            onClick={() => pageToggler(item.id)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Hidden smDown>
        <Drawer variant="permanent">
          <Box component="span" m={3}>
            <Link
              to="/"
              className={classes.link}
              onClick={() => setActivePage("home")}
            >
              <img src={computer} width="200px" />
              <Typography variant="h4" component="h2" color="primary">
                Henry J. Webster
              </Typography>
            </Link>
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
        </Drawer>
      </Hidden>
      <Grid
        container
        direction="row"
        alignContent="flex-start"
        wrap="nowrap"
        style={{
          margin: 0,
          width: "100%",
        }}
      >
        <Grid item>
          <Hidden smDown>
            <Container className={classes.marginBox}></Container>
          </Hidden>
        </Grid>

        <Grid container item>
          <Container maxWidth="sm">{props.children}</Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
