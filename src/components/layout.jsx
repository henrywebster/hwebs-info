import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  CssBaseline,
  withStyles,
  Box,
} from "@material-ui/core"
import { Link, useStaticQuery, graphql } from "gatsby"
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
    margin: 10,
  },
})

const onHomePage = location => location === "/"

const getLink = (section, pathname, props, text = undefined) =>
  onHomePage(pathname) ? (
    <LinkTypography href={`#${section}`} {...props}>
      {text ? text : section}
    </LinkTypography>
  ) : (
    <LinkTypography component={Link} to={`/#${section}`} {...props}>
      {text ? text : section}
    </LinkTypography>
  )

const LinkTypography = ({
  children,
  component = "a",
  variant = "subtitle2",
  ...props
}) => (
  <Typography
    variant={variant}
    color="primary"
    component={component}
    {...props}
  >
    {children}
  </Typography>
)

const Footer = withStyles(styles)(({ classes, version, copyright }) => (
  <Box padding={2} textAlign="center" component="footer">
    <Typography variant="subtitle2" component="span" className={classes.items}>
      {`©${copyright}`}
    </Typography>
    |
    <Typography variant="subtitle2" component="span" className={classes.items}>
      {`v${version}`}
    </Typography>
    |
    <LinkTypography
      className={classes.items}
      href="https://github.com/henrywebster/hwebs-info"
      target="_blank"
    >
      🖥️ Source on GitHub
    </LinkTypography>
    |
    <LinkTypography
      className={classes.items}
      href="https://github.com/henrywebster/hwebs-info/issues"
      target="_blank"
    >
      ⚠️ Report an Issue
    </LinkTypography>
  </Box>
))

const Layout = withStyles(styles)(
  ({ location: { pathname }, children, classes }) => {
    const {
      site: { siteMetadata },
    } = useStaticQuery(
      graphql`
        query MetadataQuery {
          site {
            siteMetadata {
              copyright
              released
              url
              version
              title
            }
          }
        }
      `
    )

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar color="transparent">
          <Toolbar className={classes.root}>
            {getLink(
              "home",
              pathname,
              {
                variant: "button",
                className: classes.name,
              },
              siteMetadata.title
            )}
            <div>
              {sections.map((section, index) => {
                return getLink(section, pathname, {
                  key: index,
                  className: classes.items,
                })
              })}
            </div>
          </Toolbar>
        </AppBar>
        {children}
        <Footer {...siteMetadata} />
      </ThemeProvider>
    )
  }
)

export default Layout
