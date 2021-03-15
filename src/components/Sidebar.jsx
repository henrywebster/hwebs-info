import React from "react"
import {
  Typography,
  List,
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
  AppBar,
  Toolbar,
  IconButton,
  withStyles,
  useMediaQuery,
} from "@material-ui/core"
import HomeIcon from "@material-ui/icons/Home"
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople"
import BuildIcon from "@material-ui/icons/Build"
import MenuIcon from "@material-ui/icons/Menu"
import BugReportIcon from "@material-ui/icons/BugReport"
import CodeIcon from "@material-ui/icons/Code"
import "@fontsource/source-sans-pro"
import "@fontsource/source-sans-pro/900.css"
import { Link } from "gatsby"
import computer from "../images/computer.png"
import { lightTheme, darkTheme } from "../../theme"
import ControlPanelItem from "./ControlPanelItem"
import { version } from "../version"
import IconLinkItem from "./IconLinkItem"
import Footer from "./Footer"
import IconHelper from "./IconHelper"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,
  content: {
    marginTop: 40,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
})

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <>
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Henry J Webster
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </>
))

const MyDrawer = withStyles(styles)(({ variant, open, content, onClose }) => (
  <Drawer variant={variant} open={open} onClose={onClose}>
    <Box component="span" m={3}>
      {variant === "permanent" && (
        <>
          <img src={computer} width="200px" alt="3D computer" />
          <Typography variant="h4" component="h2" color="primary">
            Henry J. Webster
          </Typography>
        </>
      )}
    </Box>
    <List>
      {content.map(item => (
        <div key={item.subtitle}>
          <Divider />
          <ListSubheader>{item.subtitle}</ListSubheader>
          {item.component}
        </div>
      ))}
      <Divider />
      <ListSubheader>Meta</ListSubheader>
      <NavFooter version={version} />
    </List>
  </Drawer>
))

// TODO: make data-driven
const FooterButtons = () => [
  <IconLinkItem
    primary="Report an Issue"
    icon={<BugReportIcon />}
    component={Link}
    to="https://github.com/henrywebster/hwebs-info/issues/new"
    target="_blank"
    dense
  />,
  <IconLinkItem
    primary="Source on GitHub"
    icon={<CodeIcon />}
    component={Link}
    to="https://github.com/henrywebster/hwebs-info/"
    target="_blank"
    dense
  />,
]

const notices = () => [version, "© 2021 Henry J. Webster"]

const NavFooter = () => (
  <Footer buttons={<FooterButtons />} notices={notices()} />
)

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
  const [drawer, setDrawer] = React.useState(false)
  const [title, setTitle] = React.useState(currentPage)

  const themeToggler = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark")
  }

  const toggleDrawer = () => {
    setDrawer(!drawer)
  }

  const pageToggler = page => {
    setActivePage(page)
    setDrawer(false)
  }

  const theme = activeTheme === "dark" ? darkTheme : lightTheme

  const smallBreakpoint = useMediaQuery(theme.breakpoints.up("md"))

  const useStyles = makeStyles({
    marginBox: {
      width: "320px",
    },
    toolbarMargin: theme.mixins.toolbar,
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
        <IconLinkItem
          to={item.to}
          key={item.id}
          selected={item.selected}
          onClick={() => pageToggler(item.id)}
          icon={item.icon}
          primary={item.text}
        />
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
          icon: "email",
          href: "mailto:hwebs@hwebs.info",
        },
        {
          text: "GitHub",
          icon: "github",
          href: "https://github.com/henrywebster",
        },
        {
          text: "Twitter",
          icon: "twitter",
          href: "https://twitter.com/hank29a",
        },
        {
          text: "itch.io",
          icon: "itchio",
          href: "https://hank29a.itch.io/",
        },
      ].map(({ text, href, icon }, index) => (
        <IconLinkItem
          primary={text}
          icon={<IconHelper icon={icon} />}
          to={href}
          target="_blank"
          key={index}
        />
      )),
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Hidden mdUp>
        <MyToolbar title={title} onMenuClick={toggleDrawer} />
      </Hidden>
      <MyDrawer
        content={content}
        open={drawer}
        onClose={toggleDrawer}
        setTitle={setTitle}
        variant={smallBreakpoint ? "permanent" : "temporary"}
      />
      <Grid
        container
        direction="row"
        alignContent="flex-start"
        wrap="nowrap"
        style={{
          marginTop: 50,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          width: "100%",
        }}
      >
        <Hidden smDown>
          <Grid item className={classes.marginBox} />
        </Hidden>
        <Grid container item className={classes.content}>
          <Container maxWidth="sm">{props.children}</Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
