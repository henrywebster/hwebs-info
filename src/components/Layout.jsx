import React, { useState } from "react"
import Sidebar from "./Sidebar"
import {
  withStyles,
  IconButton,
  AppBar,
  Typography,
  Toolbar,
  Hidden,
  Grid,
  makeStyles,
  Container,
  ThemeProvider,
  CssBaseline,
} from "@material-ui/core"
import IconHelper from "./IconHelper"
import { lightTheme, darkTheme } from "../../theme"

const styles = theme => ({
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
})

const MyToolbar = withStyles(styles)(({ classes, onMenuClick }) => (
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
          <IconHelper icon="menu" />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          Henry J Webster
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </>
))

export default function Layout({ children, location }) {
  const [drawer, setDrawer] = useState(false)
  const [activeTheme, setActiveTheme] = useState("dark")

  const themeToggler = () => {
    activeTheme === "dark" ? setActiveTheme("light") : setActiveTheme("dark")
  }

  const theme = activeTheme === "dark" ? darkTheme : lightTheme

  const useStyles = makeStyles({
    marginBox: {
      minWidth: "320px",
    },
    toolbarMargin: theme.mixins.toolbar,
  })

  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Sidebar
        location={location}
        open={drawer}
        onClose={() => setDrawer(false)}
        onThemeChange={themeToggler}
      />
      <main>
        <Hidden mdUp>
          <MyToolbar
            onMenuClick={() => {
              setDrawer(!drawer)
            }}
          />
        </Hidden>
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
            <Container maxWidth="md">{children}</Container>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  )
}
