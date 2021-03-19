import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  withStyles,
  Button,
  Container,
} from "@material-ui/core"
import { darkTheme } from "../../theme"

const sections = ["home", "about", "projects"]

const styles = theme => ({
  toolbar: {
    marginBottom: theme.mixins.toolbar,
  },
})

const Layout = withStyles(styles)(({ children, classes }) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <AppBar color="transparent">
      <Toolbar>
        <Typography variant="h6" color="primary">
          Henry J. Webster
        </Typography>
        {sections.map((section, index) => (
          <Button component="a" href={`#${section}`} key={index}>
            {section}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
    {/* <div className={classes.toolbar} /> */}
    {/* <Container maxWidth="md">{children}</Container> */}
    {children}
  </ThemeProvider>
))

export default Layout
