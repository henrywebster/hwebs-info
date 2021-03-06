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
  BottomNavigation,
  BottomNavigationAction,
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import TwitterIcon from "@material-ui/icons/Twitter"
import GitHubIcon from "@material-ui/icons/GitHub"
import SportsEsportsIcon from "@material-ui/icons/SportsEsports"
import EmailIcon from "@material-ui/icons/Email"
import BuildIcon from "@material-ui/icons/Build"
import MenuIcon from "@material-ui/icons/Menu"
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness7Icon from "@material-ui/icons/Brightness7"
import "@fontsource/source-sans-pro"
import "@fontsource/source-sans-pro/900.css"
import { Link } from "gatsby"
import computer from "../images/computer.png"
import { lightTheme, darkTheme } from "../../theme"
import ControlPanelItem from "./ControlPanelItem"

export default function Sidebar(props) {
  const currentPage = () => {
    const pathname = props.location.pathname

    // TODO: change to regex
    if (pathname === "/") return "home"
    else if (pathname === "/about/" || pathname === "/about") return "about"
    else if (pathname === "/projects/" || pathname === "/projects")
      return "projects"
  }
  const [activeTheme, setActiveTheme] = React.useState("dark")
  const [activePage, setActivePage] = React.useState(currentPage)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const themeToggler = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark")
  }

  const drawerToggler = () => {}

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
    stickToBottom: {
      width: "100%",
      position: "fixed",
      bottom: 0,
    },
    toolbarMargin: theme.mixins.toolbar,
    bottomMargin: {
      marginBottom: "75px",
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
        <ListItem
          component={Link}
          to={item.to}
          key={item.id}
          button
          selected={item.selected}
          onClick={() => pageToggler(item.id)}
        >
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
          key={item.text}
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
        <ListItem
          button
          component="a"
          href={item.href}
          target="_blank"
          key={item.text}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      )),
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Hidden mdUp>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Henry J Webster</Typography>
            <IconButton
              edge="end"
              className={classes.menuButton}
              color="inherit"
              onClick={themeToggler}
            >
              {activeTheme === "light" ? (
                <Brightness4Icon />
              ) : (
                <Brightness7Icon />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className={classes.toolbarMargin} />
      </Hidden>

      <Hidden smDown>
        <Drawer variant="permanent">
          <Box component="span" m={3}>
            <Link
              to="/"
              className={classes.link}
              onClick={() => setActivePage("home")}
            >
              <img src={computer} width="200px" alt="3D computer" />
              <Typography variant="h4" component="h2" color="primary">
                Henry J. Webster
              </Typography>
            </Link>
          </Box>
          <List>
            {content.map(item => (
              <div key={item.subtitle}>
                <Divider />
                <ListSubheader>{item.subtitle}</ListSubheader>
                {item.component}
              </div>
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
        <Hidden smDown>
          <Grid item className={classes.marginBox} />
        </Hidden>

        <Grid container item>
          <Container maxWidth="sm">{props.children}</Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
