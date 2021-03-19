import React from "react"
import {
  Typography,
  List,
  Divider,
  ListSubheader,
  Box,
  Drawer,
  useMediaQuery,
  useTheme,
  withStyles,
} from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import "@fontsource/source-sans-pro"
import "@fontsource/source-sans-pro/900.css"
import computer from "../images/computer.png"
import ControlPanelItem from "./ControlPanelItem"
import { version } from "../version"
import IconLinkItem from "./IconLinkItem"
import Footer from "./Footer"
import IconHelper from "./IconHelper"

const MyDrawer = ({ variant, open, content, onClose, meta }) => (
  <Drawer variant={variant} open={open} onClose={onClose}>
    <Box component="span" m={3} width="185px">
      {variant === "permanent" && (
        <>
          <img src={computer} width="185px" alt="3D computer" />
          <Typography variant="h3" component="h2" color="primary">
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
      <NavFooter version={version} meta={meta} />
    </List>
  </Drawer>
)

const FooterButtons = ({ content }) =>
  content.map(({ text, icon, to }, index) => (
    <IconLinkItem
      primary={text}
      icon={<IconHelper icon={icon} />}
      to={to}
      target="_blank"
      dense
      key={index}
    />
  ))

const notices = () => [version, "© 2021 Henry J. Webster"]

const NavFooter = ({ meta }) => (
  <Footer buttons={<FooterButtons content={meta} />} notices={notices()} />
)

export default function Sidebar(props) {
  // TODO: also get site title from this query
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      dataJson {
        sidebar {
          contact {
            href
            icon
            text
          }
          meta {
            icon
            text
            to
          }
        }
      }
    }
  `)

  const currentPage = () => {
    const pathname = props.location.pathname

    // TODO: change to regex
    if (pathname === "/") return "home"
    else if (pathname.startsWith("/about")) return "about"
    else if (pathname.startsWith("/projects")) return "projects"
  }
  const [activePage, setActivePage] = React.useState(currentPage)

  const theme = useTheme()

  const pageToggler = page => {
    setActivePage(page)
    props.onClose()
  }

  const smallBreakpoint = useMediaQuery(theme.breakpoints.up("md"))

  const navigation = [
    {
      id: "home",
      text: "Home",
      icon: "home",
      selected: activePage === "home",
      to: "/",
    },
    {
      id: "about",
      text: "About",
      icon: "wave",
      selected: activePage === "about",
      to: "/about",
    },
    {
      id: "projects",
      text: "Projects",
      icon: "build",
      selected: activePage === "projects",
      to: "/projects",
    },
  ]

  const content = [
    {
      subtitle: "Navigation",
      component: navigation.map(({ text, to, id, selected, icon }, index) => (
        <IconLinkItem
          to={to}
          key={index}
          selected={selected}
          onClick={() => pageToggler(id)}
          icon={<IconHelper icon={icon} />}
          primary={text}
        />
      )),
    },
    {
      // TODO: need to get initial state from layout
      subtitle: "Control Panel",
      component: [{ text: "Dark Mode", checked: true }].map(item => (
        <ControlPanelItem
          text={item.text}
          checked={item.checked}
          onChange={props.onThemeChange}
          key={item.text}
        />
      )),
    },
    {
      subtitle: "Contact",
      component: data.dataJson.sidebar.contact.map(
        ({ text, href, icon }, index) => (
          <IconLinkItem
            primary={text}
            icon={<IconHelper icon={icon} />}
            to={href}
            target="_blank"
            key={index}
          />
        )
      ),
    },
  ]

  return (
    <MyDrawer
      content={content}
      open={props.open}
      onClose={props.onClose}
      variant={smallBreakpoint ? "permanent" : "temporary"}
      meta={data.dataJson.sidebar.meta}
    />
  )
}
