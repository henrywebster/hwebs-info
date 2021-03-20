import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  withStyles,
  Button,
} from "@material-ui/core"
import { Link } from "gatsby"
import { darkTheme } from "../../theme"

const sections = ["home", "projects", "about"]

const styles = theme => ({
  root: {
    justifyContent: "space-between",
  },
  name: {
    textDecoration: "none",
  },
})

const Layout = withStyles(styles)(({ location, children, classes }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppBar color="transparent">
      <Toolbar className={classes.root}>
        {location.pathname === "/" ? (
          <Typography
            color="primary"
            variant="button"
            component="a"
            href="#home"
            className={classes.name}
          >
            Henry J. Webster
          </Typography>
        ) : (
          <Typography
            color="primary"
            variant="button"
            component={Link}
            to="/"
            className={classes.name}
          >
            Henry J. Webster
          </Typography>
        )}
        <span>
          {sections.map((section, index) => {
            return location.pathname === "/" ? (
              <Button component="a" href={`#${section}`} key={index}>
                {section}
              </Button>
            ) : (
              <Button component={Link} to={`/#${section}`} key={index}>
                {section}
              </Button>
            )
          })}
        </span>
      </Toolbar>
    </AppBar>
    {children}
  </ThemeProvider>
))

export default Layout
