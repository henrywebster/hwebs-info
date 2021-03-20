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

const sections = ["home", "about", "projects"]

const styles = theme => ({
  toolbar: {
    marginBottom: 60,
  },
  appbar: {
    display: "flex",
    alignItems: "space-between",
  },
})

const Layout = withStyles(styles)(({ location, children, classes }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppBar color="transparent">
      <Toolbar className={classes.appbar}>
        <Typography variant="h6" color="primary">
          Henry J. Webster
        </Typography>
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
      </Toolbar>
    </AppBar>
    {children}
  </ThemeProvider>
))

export default Layout
