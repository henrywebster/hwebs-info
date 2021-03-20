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
import theme from "../../theme"

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
  <ThemeProvider theme={theme}>
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
        <div>
          {sections.map((section, index) => {
            return location.pathname === "/" ? (
              <Button
                // size="small"
                component="a"
                href={`#${section}`}
                key={index}
              >
                {section}
              </Button>
            ) : (
              <Button
                size="small"
                component={Link}
                to={`/#${section}`}
                key={index}
              >
                {section}
              </Button>
            )
          })}
        </div>
      </Toolbar>
    </AppBar>
    {children}
  </ThemeProvider>
))

export default Layout
