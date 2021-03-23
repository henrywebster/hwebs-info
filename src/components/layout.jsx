import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  withStyles,
  Button,
  Box,
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
  items: {
    padding: 10,
  },
})

const Footer = withStyles(styles)(({ classes }) => (
  <Box padding={2} textAlign="center" component="footer">
    <Typography variant="subtitle2" component="span" className={classes.items}>
      © 2021 Henry J. Webster
    </Typography>
    |
    <Typography variant="subtitle2" component="span" className={classes.items}>
      v0.1.0
    </Typography>
    |
    <Typography
      variant="subtitle2"
      component="a"
      color="primary"
      className={classes.items}
      href="https://github.com/henrywebster/hwebs-info"
      target="_blank"
    >
      🖥️ Source on GitHub
    </Typography>
    |
    <Typography
      variant="subtitle2"
      component="a"
      color="primary"
      className={classes.items}
      href="https://github.com/henrywebster/hwebs-info/issues"
      target="_blank"
    >
      ⚠️ Report an Issue
    </Typography>
  </Box>
))

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
    <Footer />
  </ThemeProvider>
))

export default Layout
