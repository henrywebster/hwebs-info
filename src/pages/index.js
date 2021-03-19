import React from "react"
import { Typography, Grid, Box, Container, withStyles } from "@material-ui/core"
import computer from "../images/computer.png"

const styles = theme => ({
  social: {
    margin: 10,
  },
  root: {
    flexGrow: 1,
  },
  img: {
    maxWidth: "100%",
  },
})

const SocialLink = withStyles(styles)(({ icon, text, href, classes }) => (
  <Typography
    variant="body1"
    color="primary"
    component="a"
    href={href}
    target="_blank"
    className={classes.social}
  >
    <span role="img" aria-label="">
      {icon}
    </span>{" "}
    {text}
  </Typography>
))

const Welcome = () => (
  <div>
    <Typography variant="h4">Welcome 👋</Typography>
    <Typography variant="body1" component="div">
      My name is Henry J. Webster, a programmer in Brooklyn, NY. <br />
      <br />
      ☀️ At work I'm building loan web services @
      <Typography
        variant="body1"
        color="primary"
        component="a"
        href="https://www.jpmorgan.com/commercial-banking"
        target="_blank"
      >
        JPMorgan Chase
      </Typography>
      . <br />
      🌔 At night I experiment with game development, music, and 3D art.
    </Typography>
  </div>
)

const Section = ({ id, children }) => (
  <Box
    component="section"
    id={id}
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    {children}
  </Box>
)

const socials = [
  {
    icon: "✉️",
    text: "Email",
    href: "mailto:hwebs@hwebs.info",
  },
  {
    icon: "🐙",
    text: "GitHub",
    href: "https://github.com/henrywebster",
  },
  {
    icon: "🐦",
    text: "Twitter",
    href: "https://twitter.com/hank29a",
  },
  {
    icon: "🕹️",
    text: "itch.io",
    href: "https://hank29a.itch.io/",
  },
]

const Index = withStyles(styles)(({ classes }) => (
  <Container maxWidth="md">
    <Section id="home" className={classes.root}>
      <Grid
        container
        component="section"
        id="home"
        justify="space-between"
        alignItems="center"
        spacing={3}
      >
        <Grid container item sm={12} md={4} justify="center">
          <img src={computer} alt="" className={classes.img} />
        </Grid>
        <Grid container item sm={12} md={8} justify="center">
          <Welcome />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            {socials.map((social, index) => (
              <SocialLink {...social} key={index} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Section>
    <Section id="about">
      <Box>
        <Typography variant="h4" gutterBottom>
          About 🧑‍🦰
        </Typography>

        <br />
        <Typography variant="body1"></Typography>
      </Box>
    </Section>
  </Container>
))

export default Index
